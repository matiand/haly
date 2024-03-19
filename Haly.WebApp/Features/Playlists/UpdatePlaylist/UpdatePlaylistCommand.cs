using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.UpdatePlaylist;

public record UpdatePlaylistCommand(string PlaylistId, string UserMarket, bool ForceUpdate)
    : IRequest<UpdatePlaylistCommandResponse?>;

public class UpdatePlaylistHandler(LibraryContext db, ISpotifyService spotifyService)
    : IRequestHandler<UpdatePlaylistCommand, UpdatePlaylistCommandResponse?>
{
    public async Task<UpdatePlaylistCommandResponse?> Handle(UpdatePlaylistCommand request,
        CancellationToken cancellationToken)
    {
        var cachedPlaylistTask = db.Playlists
            .Include(p => p.Tracks.OrderBy(t => t.PositionInPlaylist))
            .Where(p => p.Id == request.PlaylistId)
            .SingleOrDefaultAsync(cancellationToken);
        var freshPlaylistTask = spotifyService.GetPlaylistWithTracks(request.PlaylistId, request.UserMarket);

        var (cachedPlaylist, freshPlaylist) = (await cachedPlaylistTask, await freshPlaylistTask);

        if (freshPlaylist is null) return null;

        if (cachedPlaylist is null)
        {
            db.Playlists.Add(freshPlaylist);
            await db.SaveChangesAsync(cancellationToken);

            return new UpdatePlaylistCommandResponse(Created: true, freshPlaylist.Id);
        }

        if (request.ForceUpdate || cachedPlaylist.SnapshotId != freshPlaylist.SnapshotId)
        {
            cachedPlaylist.UpdateModel(freshPlaylist, includingTracks: true, includingLikes: true);
            await db.SaveChangesAsync(cancellationToken);
        }

        return new UpdatePlaylistCommandResponse(Created: false, freshPlaylist.Id);
    }
}
