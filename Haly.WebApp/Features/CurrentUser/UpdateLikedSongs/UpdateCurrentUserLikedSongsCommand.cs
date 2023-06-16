using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;

public record UpdateCurrentUserLikedSongsCommand(string UserId, string UserMarket) : IRequest<UpdateCurrentUserLikedSongsResponse?>;

public record UpdateCurrentUserLikedSongsHandler : IRequestHandler<UpdateCurrentUserLikedSongsCommand, UpdateCurrentUserLikedSongsResponse?>
{
    private readonly ISpotifyService _spotifyService;
    private readonly CurrentUserStore _currentUserStore;
    private readonly LibraryContext _db;

    public UpdateCurrentUserLikedSongsHandler(ISpotifyService spotifyService, CurrentUserStore currentUserStore, LibraryContext db)
    {
        _spotifyService = spotifyService;
        _currentUserStore = currentUserStore;
        _db = db;
    }

    // todo: refactor into helper methods
    public async Task<UpdateCurrentUserLikedSongsResponse?> Handle(UpdateCurrentUserLikedSongsCommand request,
        CancellationToken cancellationToken)
    {
        var playlistId = GetLikedSongsPlaylistId(request);
        var cachedPlaylist =
            await _db.Playlists
                .Include(p => p.Tracks)
                .FirstOrDefaultAsync(p => p.Id == playlistId, cancellationToken);

        var apiResponse = await _spotifyService.GetLikedSongsIfChanged(request.UserMarket, cachedPlaylist?.SnapshotId);

        if (apiResponse is null && cachedPlaylist is null) return null;
        if (apiResponse is null)
            return new UpdateCurrentUserLikedSongsResponse(Created: false, cachedPlaylist!.Adapt<PlaylistBriefDto>());

        if (cachedPlaylist is null)
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
                }
            };

            _db.Playlists.Add(newPlaylist);
            await _db.SaveChangesAsync(cancellationToken);

            return new UpdateCurrentUserLikedSongsResponse(Created: true, newPlaylist.Adapt<PlaylistBriefDto>());
        }

        cachedPlaylist.SnapshotId = apiResponse.SnapshotId;
        cachedPlaylist.Tracks = apiResponse.Tracks;
        await _db.SaveChangesAsync(cancellationToken);

        return new UpdateCurrentUserLikedSongsResponse(Created: false, cachedPlaylist.Adapt<PlaylistBriefDto>());
    }

    private static string GetLikedSongsPlaylistId(UpdateCurrentUserLikedSongsCommand request) => $"LikesOf_{request.UserId}";
}
