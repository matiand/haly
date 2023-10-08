using Haly.WebApp.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.GetLikedSongs;

public record GetMyLikedSongsQuery(PrivateUserDto User) : IRequest<GetMyLikedSongsResponse>;

public class GetMyLikedSongsQueryHandler : IRequestHandler<GetMyLikedSongsQuery, GetMyLikedSongsResponse>
{
    private readonly LibraryContext _db;

    public GetMyLikedSongsQueryHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<GetMyLikedSongsResponse> Handle(GetMyLikedSongsQuery request,
        CancellationToken cancellationToken)
    {
        var playlistId = request.User.LikedSongsCollectionId;

        var songs = await _db.PlaylistTracks.Where(t => t.PlaylistId == playlistId).ToListAsync(cancellationToken);

        // 'Liked Songs' cannot have null ids.
        var likedSongIdByPlaybackId = songs.DistinctBy(t => t.PlaybackId)
            .ToDictionary(track => track.PlaybackId!, track => track.Id!);

        return new GetMyLikedSongsResponse(likedSongIdByPlaybackId);
    }
}
