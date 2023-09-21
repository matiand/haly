using Haly.WebApp.Data;
using Haly.WebApp.Features.Playlists;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.GetLikedSongs;

public record GetMyLikedSongsQuery(PrivateUserDto User) : IRequest<IEnumerable<PlaylistTrackDto>>;

public class GetMyLikedSongsQueryHandler : IRequestHandler<GetMyLikedSongsQuery, IEnumerable<PlaylistTrackDto>>
{
    private readonly LibraryContext _db;

    public GetMyLikedSongsQueryHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<PlaylistTrackDto>> Handle(GetMyLikedSongsQuery request,
        CancellationToken cancellationToken)
    {
        var playlistId = request.User.LikedSongsCollectionId;

        var songs = await _db.PlaylistTracks.Where(t => t.PlaylistId == playlistId).ToListAsync(cancellationToken);

        return songs.Adapt<IEnumerable<PlaylistTrackDto>>();
    }
}
