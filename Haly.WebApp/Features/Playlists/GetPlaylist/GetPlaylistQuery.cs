using Haly.WebApp.Data;
using Haly.WebApp.Features.Pagination;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetPlaylist;

public record GetPlaylistQuery(string Id) : IRequest<GetPlaylistResponse?>;

public class GetPlaylistHandler : IRequestHandler<GetPlaylistQuery, GetPlaylistResponse?>
{
    private readonly LibraryContext _db;
    private const int TracksPaginationLimit = 25;

    public GetPlaylistHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<GetPlaylistResponse?> Handle(GetPlaylistQuery request, CancellationToken cancellationToken)
    {
        var playlist = await _db.Playlists
            .Where(p => p.Id == request.Id)
            .ProjectToType<GetPlaylistResponse>()
            .FirstOrDefaultAsync(cancellationToken);

        if (playlist is null) return null;

        var tracks = await _db.Tracks
            .Where(t => t.PlaylistId == request.Id)
            // This projection throws an error, that it can't translate ArtistDto
            // I think it has something to do with storing them as jsonb column
            // .ProjectToType<TrackDto>()
            .ToPaginatedListAsync(offset: 0, TracksPaginationLimit, cancellationToken);
        playlist.Tracks = tracks.Adapt<PaginatedList<TrackDto>>();

        return playlist;
    }
}
