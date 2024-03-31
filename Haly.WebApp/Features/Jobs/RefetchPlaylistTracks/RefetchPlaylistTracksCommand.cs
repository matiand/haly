using Haly.GeneratedClients;
using Haly.WebApp.Data;
using Haly.WebApp.Hubs;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Jobs.RefetchPlaylistTracks;

public record RefetchPlaylistTracksCommand(string UserId) : IRequest;

public class RefetchPlaylistTracksHandler(
    ISpotifyService spotify,
    LibraryContext db,
    IHubContext<MessageHub, IMessageHubClient> messageHub)
    : IRequestHandler<RefetchPlaylistTracksCommand>
{
    public async Task Handle(RefetchPlaylistTracksCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = request.UserId;
        var user = await db.Users
            .Include(user => user.RefetchPlaylistTracksJobs)
            .AsNoTracking()
            .FirstOrDefaultAsync(user => user.Id == currentUserId, cancellationToken);

        if (user is null || user.RefetchPlaylistTracksJobs.Count == 0) return;

        var jobs = user.RefetchPlaylistTracksJobs.ToList();
        await messageHub.Clients.All.PlaylistsWithOldTracks(jobs.Select(j => j.PlaylistId));

        for (var i = 0; i < jobs.Count; i++)
        {
            await HandleJob(jobs[i], cancellationToken);

            await messageHub.Clients.All.PlaylistUpdated(jobs[i].PlaylistId);
            await messageHub.Clients.All.PlaylistsWithOldTracks(jobs.Skip(i + 1).Select(j => j.PlaylistId));
        }
    }

    private async Task HandleJob(RefetchPlaylistTracksJob job, CancellationToken cancellationToken)
    {
        var playlist = await db.Playlists
            .Include(p => p.Tracks)
            .FirstOrDefaultAsync(p => p.Id == job.PlaylistId, cancellationToken);

        if (playlist is not null)
        {
            try
            {
                var freshPlaylist = await spotify.GetPlaylistWithTracks(job.PlaylistId, job.User.Market);
                playlist.UpdateModel(freshPlaylist!, includingTracks: true, includingLikes: true);
            }
            catch (ApiException)
            {
                // Our spotify service uses Polly for fault handling, this should only fail if
                // Spotify servers are offline for a significant amount of time. In that case we
                // just skip this job and return to it later.
                return;
            }
        }

        db.Remove(job);

        // Treat each job as a transaction
        await db.SaveChangesAsync(cancellationToken);
    }
}
