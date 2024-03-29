using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.UpdatePlaylist;

public record UpdatePlaylistCommand(string PlaylistId, string UserMarket, bool ForceUpdate)
    : IRequest<UpdatePlaylistCommandResponse?>;

public class UpdatePlaylistHandler : IRequestHandler<UpdatePlaylistCommand, UpdatePlaylistCommandResponse?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotifyService;

    public UpdatePlaylistHandler(LibraryContext db, ISpotifyService spotifyService)
    {
        _db = db;
        _spotifyService = spotifyService;
    }

    public async Task<UpdatePlaylistCommandResponse?> Handle(UpdatePlaylistCommand request,
        CancellationToken cancellationToken)
    {
        var cachedPlaylistTask = _db.Playlists
            .Include(p => p.Tracks.OrderBy(t => t.PositionInPlaylist))
            .Where(p => p.Id == request.PlaylistId)
            .SingleOrDefaultAsync(cancellationToken);
        var freshPlaylistTask = _spotifyService.GetPlaylistWithTracks(request.PlaylistId, request.UserMarket);

        var (cachedPlaylist, freshPlaylist) = (await cachedPlaylistTask, await freshPlaylistTask);

        if (freshPlaylist is null) return null;

        if (cachedPlaylist is null)
        {
            _db.Playlists.Add(freshPlaylist);
            await _db.SaveChangesAsync(cancellationToken);

            return new UpdatePlaylistCommandResponse(Created: true, freshPlaylist.Id);
        }

        if (request.ForceUpdate || cachedPlaylist.SnapshotId != freshPlaylist.SnapshotId)
        {
            cachedPlaylist.UpdateModel(freshPlaylist, includingTracks: true, includingLikes: true);
            await _db.SaveChangesAsync(cancellationToken);
        }

        return new UpdatePlaylistCommandResponse(Created: false, freshPlaylist.Id);
    }
}
