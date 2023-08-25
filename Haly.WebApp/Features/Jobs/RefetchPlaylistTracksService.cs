using Haly.GeneratedClients;
using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Hubs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Jobs;

public class RefetchPlaylistTracksService : BackgroundService
{
    private static readonly TimeSpan PollingRate = TimeSpan.FromSeconds(value: 15);
    private readonly CurrentUserStore _currentUserStore;
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly IHubContext<MessageHub, IMessageHubClient> _messageHub;

    public RefetchPlaylistTracksService(CurrentUserStore currentUserStore, IServiceScopeFactory serviceScopeFactory,
        IHubContext<MessageHub, IMessageHubClient> messageHub)
    {
        _currentUserStore = currentUserStore;
        _serviceScopeFactory = serviceScopeFactory;
        _messageHub = messageHub;
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
        var currentUserId = _currentUserStore.User!.Id;
        var user = await db.Users
            .Include(user => user.RefetchPlaylistTracksJobs)
            .AsNoTracking()
            .FirstOrDefaultAsync(user => user.Id == currentUserId, stoppingToken);

        if (user is null || user.RefetchPlaylistTracksJobs.Count == 0) return;

        var jobs = user.RefetchPlaylistTracksJobs.ToList();
        await _messageHub.Clients.All.PlaylistsWithOldTracks(jobs.Select(j => j.PlaylistId));
        for (var i = 0; i < jobs.Count; i++)
        {
            var job = jobs[i];

            var playlist = await db.Playlists
                .Include(p => p.Tracks)
                .FirstOrDefaultAsync(p => p.Id == job.PlaylistId, stoppingToken);

            if (playlist is not null)
            {
                try
                {
                    var freshPlaylist = await spotify.GetPlaylistWithTracks(job.PlaylistId, job.User.Market);
                    playlist.Tracks = freshPlaylist!.Tracks;

                    // We also update LikesTotal here, because the CurrentUserPlaylists endpoint doesn't have them.
                    playlist.LikesTotal = freshPlaylist.LikesTotal;

                    // Don't try to update SnapshotId here, because it can cause infinite updates.
                    // For some playlists owned by the 'spotify' user, the SnapshotId changes every time.
                }
                catch (ApiException)
                {
                    // Our spotify service uses Polly for fault handling, this should only fail if
                    // Spotify servers are offline for a significant amount of time. In that case we
                    // just skip this job and return to it later.
                    continue;
                }
            }

            db.Remove(job);

            // Treat each job as a transaction
            await db.SaveChangesAsync(stoppingToken);
            await _messageHub.Clients.All.PlaylistsWithOldTracks(jobs.Skip(i + 1).Select(j => j.PlaylistId));
        }
    }
}
