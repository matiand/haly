using Haly.WebApp.Data;
using Haly.WebApp.Features.Pagination;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public record GetPlaylistTracksQuery(string PlaylistId, int Limit = 25, int Offset = 0)
    : IRequest<PaginatedList<PlaylistTrackDto>?>;

public class GetPlaylistTracksHandler : IRequestHandler<GetPlaylistTracksQuery, PaginatedList<PlaylistTrackDto>?>
{
    private readonly LibraryContext _db;

    public GetPlaylistTracksHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<PaginatedList<PlaylistTrackDto>?> Handle(GetPlaylistTracksQuery request,
        CancellationToken cancellationToken)
    {
        var playlist = await _db.Playlists.AnyAsync(p => p.Id == request.PlaylistId, cancellationToken);
        if (!playlist) return null;

        var tracks = await _db.PlaylistTracks
            .Where(t => t.PlaylistId == request.PlaylistId)
            .OrderBy(t => t.PositionInPlaylist)
            .ToPaginatedListAsync(offset: request.Offset, limit: request.Limit, cancellationToken);

        return tracks.Adapt<PaginatedList<PlaylistTrackDto>>();
    }
}
