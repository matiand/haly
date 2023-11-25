using Haly.GeneratedClients;
using Haly.WebApp.Data;
using Haly.WebApp.Hubs;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Jobs;

public record RefetchPlaylistTracksCommand(string UserId) : IRequest;

public class RefetchPlaylistTracksHandler : IRequestHandler<RefetchPlaylistTracksCommand>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;
    private readonly IHubContext<MessageHub, IMessageHubClient> _messageHub;

    public RefetchPlaylistTracksHandler(ISpotifyService spotify, LibraryContext db,
        IHubContext<MessageHub, IMessageHubClient> messageHub)
    {
        _spotify = spotify;
        _db = db;
        _messageHub = messageHub;
    }

    public async Task Handle(RefetchPlaylistTracksCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = request.UserId;
        var user = await _db.Users
            .Include(user => user.RefetchPlaylistTracksJobs)
            .AsNoTracking()
            .FirstOrDefaultAsync(user => user.Id == currentUserId, cancellationToken);

        if (user is null || user.RefetchPlaylistTracksJobs.Count == 0) return;

        var jobs = user.RefetchPlaylistTracksJobs.ToList();
        await _messageHub.Clients.All.PlaylistsWithOldTracks(jobs.Select(j => j.PlaylistId));

        for (var i = 0; i < jobs.Count; i++)
        {
            await HandleJob(jobs[i], cancellationToken);

            await _messageHub.Clients.All.PlaylistUpdated(jobs[i].PlaylistId);
            await _messageHub.Clients.All.PlaylistsWithOldTracks(jobs.Skip(i + 1).Select(j => j.PlaylistId));
        }
    }

    private async Task HandleJob(RefetchPlaylistTracksJob job, CancellationToken cancellationToken)
    {
        var playlist = await _db.Playlists
            .Include(p => p.Tracks)
            .FirstOrDefaultAsync(p => p.Id == job.PlaylistId, cancellationToken);

        if (playlist is not null)
        {
            try
            {
                var freshPlaylist = await _spotify.GetPlaylistWithTracks(job.PlaylistId, job.User.Market);
                playlist.UpdateTracks(freshPlaylist!.Tracks);

                // We also update LikesTotal here, because the CurrentUserPlaylists endpoint doesn't have them.
                playlist.LikesTotal = freshPlaylist.LikesTotal;

                // For some playlists owned by the 'spotify' user, the SnapshotId changes every time.
                // We don't update it to avoid infinite jobs.
            }
            catch (ApiException)
            {
                // Our spotify service uses Polly for fault handling, this should only fail if
                // Spotify servers are offline for a significant amount of time. In that case we
                // just skip this job and return to it later.
                return;
            }
        }

        _db.Remove(job);

        // Treat each job as a transaction
        await _db.SaveChangesAsync(cancellationToken);
    }
}
