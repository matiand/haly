using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.HostedServices;

public class RefetchPlaylistTracksService : BackgroundService
{
    private static readonly TimeSpan PollingRate = TimeSpan.FromSeconds(value: 15);
    private readonly CurrentUserStore _currentUserStore;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public RefetchPlaylistTracksService(CurrentUserStore currentUserStore, IServiceScopeFactory serviceScopeFactory)
    {
        _currentUserStore = currentUserStore;
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            if (!_currentUserStore.IsEmpty)
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<LibraryContext>();
                var spotify = scope.ServiceProvider.GetRequiredService<ISpotifyService>();

                await HandleQueuedJobs(db, spotify, stoppingToken);
            }

            await Task.Delay(PollingRate, stoppingToken);
        }
    }

    private async Task HandleQueuedJobs(LibraryContext db, ISpotifyService spotify, CancellationToken stoppingToken)
    {
        var currentUserId = _currentUserStore.UserId!;
        var user = await db.Users
                    .Include(user => user.RefetchPlaylistTracksJobs)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(user => user.Id == currentUserId, stoppingToken);

        if (user is null) return;

        foreach (var job in user.RefetchPlaylistTracksJobs.ToList())
        {
            var playlist = await db.Playlists
                .Include(p => p.Tracks)
                .FirstOrDefaultAsync(p => p.Id == job.PlaylistId, stoppingToken);
            if (playlist is not null)
            {
                var tracks = await spotify.GetPlaylistTracks(job.PlaylistId, job.User.Market);
                playlist.Tracks = tracks;
            }

            db.Remove(job);

            // Treat each job as a transaction
            await db.SaveChangesAsync(stoppingToken);
        }
    }
}
