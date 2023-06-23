using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;

public record UpdateCurrentUserLikedSongsCommand(string UserId, string UserMarket)
    : IRequest<UpdateCurrentUserLikedSongsResponse>;

public record UpdateCurrentUserLikedSongsHandler
    : IRequestHandler<UpdateCurrentUserLikedSongsCommand, UpdateCurrentUserLikedSongsResponse>
{
    private readonly ISpotifyService _spotifyService;
    private readonly CurrentUserStore _currentUserStore;
    private readonly LibraryContext _db;

    public UpdateCurrentUserLikedSongsHandler(ISpotifyService spotifyService, CurrentUserStore currentUserStore,
        LibraryContext db)
    {
        _spotifyService = spotifyService;
        _currentUserStore = currentUserStore;
        _db = db;
    }

    public async Task<UpdateCurrentUserLikedSongsResponse> Handle(UpdateCurrentUserLikedSongsCommand request,
        CancellationToken cancellationToken)
    {
        var playlistId = GetLikedSongsPlaylistId(request);
        var cachedPlaylist =
            await _db.Playlists
                .FirstOrDefaultAsync(p => p.Id == playlistId, cancellationToken);
        var likedSongs = await _spotifyService.GetLikedSongsIfChanged(request.UserMarket, cachedPlaylist?.SnapshotId);

        if (cachedPlaylist is null)
        {
            // If cachedPlaylist is null, then its snapshotId was null, therefore likedSongs exist
            // cause we had to fetch them (remember that any errors are handled by our API
            // middleware, so we don't care about them).
            var newPlaylist = await AddNewPlaylist(playlistId, likedSongs!, cancellationToken);
            return new UpdateCurrentUserLikedSongsResponse(Created: true, newPlaylist.Adapt<PlaylistBriefDto>());
        }

        if (likedSongs is null)
        {
            return new UpdateCurrentUserLikedSongsResponse(Created: false, cachedPlaylist.Adapt<PlaylistBriefDto>());
        }

        await UpdatePlaylist(cachedPlaylist, likedSongs, cancellationToken);

        return new UpdateCurrentUserLikedSongsResponse(Created: false, cachedPlaylist.Adapt<PlaylistBriefDto>());
    }

    private static string GetLikedSongsPlaylistId(UpdateCurrentUserLikedSongsCommand request) =>
        $"LikesOf_{request.UserId}";

    private async Task<Playlist> AddNewPlaylist(string playlistId, LikedSongsDto apiResponse,
        CancellationToken cancellationToken)
    {
        var newPlaylist = new Playlist()
        {
            Id = playlistId,
            Name = "Liked Songs",
            SnapshotId = apiResponse.SnapshotId,
            Tracks = apiResponse.Tracks,
            Metadata = new PlaylistMetadata()
            {
                Owner = _currentUserStore.User!.Adapt<Owner>(),
            },
        };

        _db.Playlists.Add(newPlaylist);
        await _db.SaveChangesAsync(cancellationToken);

        return newPlaylist;
    }

    private async Task UpdatePlaylist(Playlist cachedPlaylist, LikedSongsDto apiResponse,
        CancellationToken cancellationToken)
    {
        cachedPlaylist.SnapshotId = apiResponse.SnapshotId;

        await _db.Entry(cachedPlaylist).Collection(p => p.Tracks).LoadAsync(cancellationToken);
        cachedPlaylist.Tracks = apiResponse.Tracks;

        await _db.SaveChangesAsync(cancellationToken);
    }
}
