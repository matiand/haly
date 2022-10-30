using Haly.WebApp.Data;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public record GetPlaylistTracksQuery(string PlaylistId) : IRequest<IEnumerable<TrackDto>?>;

public class GetPlaylistTracksHandler : IRequestHandler<GetPlaylistTracksQuery, IEnumerable<TrackDto>?>
{
    private readonly LibraryContext _db;

    public GetPlaylistTracksHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<TrackDto>?> Handle(GetPlaylistTracksQuery request,
        CancellationToken cancellationToken)
    {
        var playlist = await _db.Playlists
            .Include(p => p.Tracks)
            .FirstOrDefaultAsync(p => p.Id == request.PlaylistId, cancellationToken);

        return playlist?.Tracks.Adapt<IEnumerable<TrackDto>>();
    }
}
