using Haly.WebApp.Data;
using Haly.WebApp.Features.Playlists.TotalDuration;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.UpdatePlaylist;

public record UpdatePlaylistCommand(string PlaylistId, string UserMarket) : IRequest<UpdatePlaylistResponse?>;

public class UpdatePlaylistHandler : IRequestHandler<UpdatePlaylistCommand, UpdatePlaylistResponse?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotifyService;
    private readonly ITotalDurationService _totalDurationService;

    public UpdatePlaylistHandler(LibraryContext db, ISpotifyService spotifyService,
        ITotalDurationService totalDurationService)
    {
        _db = db;
        _spotifyService = spotifyService;
        _totalDurationService = totalDurationService;
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
            return new UpdatePlaylistResponse(Created: true, MapToPlaylistWithTracksDto(freshPlaylist));
        }

        if (cachedPlaylist.SnapshotId != freshPlaylist.SnapshotId)
        {
            cachedPlaylist.UpdateModel(freshPlaylist, includingTracks: true);
            await _db.SaveChangesAsync(cancellationToken);
        }

        return new UpdatePlaylistResponse(Created: false, MapToPlaylistWithTracksDto(cachedPlaylist));
    }

    private PlaylistWithTracksDto MapToPlaylistWithTracksDto(Playlist playlistWithTracks)
    {
        var dto = playlistWithTracks.Adapt<PlaylistWithTracksDto>();
        var duration = _totalDurationService.FromTracks(playlistWithTracks.Tracks);
        dto.TotalDuration = duration.Format();

        return dto;
    }
}
