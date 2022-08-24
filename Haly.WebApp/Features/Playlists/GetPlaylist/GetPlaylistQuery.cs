using Haly.WebApp.Data;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetPlaylist;

public record GetPlaylistQuery(string Id) : IRequest<PlaylistDto?>;

public class GetPlaylistQueryHandler : IRequestHandler<GetPlaylistQuery, PlaylistDto?>
{
    private readonly LibraryContext _db;

    public GetPlaylistQueryHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<PlaylistDto?> Handle(GetPlaylistQuery request, CancellationToken cancellationToken)
    {
        var cachedPlaylist = await _db.Playlists.Include(p => p.Tracks)
            .Where(p => p.Id == request.Id)
            // When using ProjectToType, we crash here, but everything works fine if we use Adapt on returned data
            // .ProjectToType<PlaylistDto>()
            .FirstOrDefaultAsync(cancellationToken: cancellationToken);

        return cachedPlaylist?.Adapt<PlaylistDto>();
    }
}
