using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.RemoveTracks;

public record RemoveTracksCommand(string PlaylistId, string UserId, RemoveTracksRequestBody Body)
    : IRequest<PlaylistBriefDto>;

public class RemoveTracksCommandHandler(LibraryContext db, ISpotifyService spotify)
    : IRequestHandler<RemoveTracksCommand, PlaylistBriefDto>
{
    public async Task<PlaylistBriefDto> Handle(RemoveTracksCommand request, CancellationToken cancellationToken)
    {
        var cachedPlaylistTask = db.Playlists
            .Include(p => p.Tracks.OrderBy(t => t.PositionInPlaylist))
            .FirstAsync(p => p.Id == request.PlaylistId, cancellationToken);

        await spotify.RemoveTracks(request.PlaylistId, request.Body.Tracks);
        var cachedPlaylist = await cachedPlaylistTask;

        try
        {
            UpdateCachedPlaylist(cachedPlaylist, request);
            ScheduleBackgroundJobs(request);
            await db.SaveChangesAsync(cancellationToken);
        }
        // Ignore any concurrency exceptions.
        catch (DbUpdateConcurrencyException)
        {
        }

        return cachedPlaylist.Adapt<PlaylistBriefDto>();
    }

    private static void UpdateCachedPlaylist(Playlist cachedPlaylist, RemoveTracksCommand request)
    {
        foreach (var removeTrackDto in request.Body.Tracks)
        {
            if (removeTrackDto.Position == -1)
            {
                var item = cachedPlaylist.Tracks.First(t => t.Uri == removeTrackDto.Uri);
                cachedPlaylist.Tracks.Remove(item);
            }
            else
            {
                var item = cachedPlaylist.Tracks.First(t =>
                    t.Uri == removeTrackDto.Uri && t.PositionInPlaylist == removeTrackDto.Position);
                cachedPlaylist.Tracks.Remove(item);
            }
        }
    }

    private void ScheduleBackgroundJobs(RemoveTracksCommand request)
    {
        var job = new RefetchPlaylistTracksJob()
        {
            UserId = request.UserId,
            PlaylistId = request.PlaylistId,
        };

        db.RefetchPlaylistTracksJobs.Add(job);
    }
}
