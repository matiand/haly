using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.UpdatePlaylist;

public record UpdatePlaylistResponse(bool Created, PlaylistWithTracksDto Playlist);

public record UpdatePlaylistCommand(string PlaylistId, string UserMarket) : IRequest<UpdatePlaylistResponse?>;

public class UpdatePlaylistHandler : IRequestHandler<UpdatePlaylistCommand, UpdatePlaylistResponse?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotifyService;

    public UpdatePlaylistHandler(LibraryContext db, ISpotifyService spotifyService)
    {
        _db = db;
        _spotifyService = spotifyService;
    }

    public async Task<UpdatePlaylistResponse?> Handle(UpdatePlaylistCommand request,
        CancellationToken cancellationToken)
    {
        var cachedPlaylistTask = _db.Playlists.Include(p => p.Tracks)
            .Where(p => p.Id == request.PlaylistId)
            .SingleOrDefaultAsync(cancellationToken);
        var freshPlaylistTask = _spotifyService.GetPlaylistWithTracks(request.PlaylistId, request.UserMarket);

        var (cachedPlaylist, freshPlaylist) = (await cachedPlaylistTask, await freshPlaylistTask);

        if (freshPlaylist is null) return null;

        if (cachedPlaylist is null)
        {
            _db.Playlists.Add(freshPlaylist);
            await _db.SaveChangesAsync(cancellationToken);
            return new UpdatePlaylistResponse(Created: true, freshPlaylist.Adapt<PlaylistWithTracksDto>());
        }

        if (cachedPlaylist.SnapshotId != freshPlaylist.SnapshotId)
        {
            cachedPlaylist.UpdateModel(freshPlaylist, includingTracks: true);
            await _db.SaveChangesAsync(cancellationToken);
        }

        return new UpdatePlaylistResponse(Created: false, cachedPlaylist.Adapt<PlaylistWithTracksDto>());
    }
}
