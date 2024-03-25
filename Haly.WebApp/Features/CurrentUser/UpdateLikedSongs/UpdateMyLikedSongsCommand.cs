using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;

public record UpdateMyLikedSongsCommand(PrivateUserDto User) : IRequest;

public record UpdateMyLikedSongsHandler : IRequestHandler<UpdateMyLikedSongsCommand>
{
    private readonly ISpotifyService _spotifyService;
    private readonly CurrentUserStore _currentUserStore;
    private readonly LibraryContext _db;

    public UpdateMyLikedSongsHandler(ISpotifyService spotifyService, CurrentUserStore currentUserStore,
        LibraryContext db)
    {
        _spotifyService = spotifyService;
        _currentUserStore = currentUserStore;
        _db = db;
    }

    public async Task Handle(UpdateMyLikedSongsCommand request, CancellationToken cancellationToken)
    {
        var playlistId = request.User.LikedSongsCollectionId;
        var cachedPlaylist =
            await _db.Playlists
                .FirstOrDefaultAsync(p => p.Id == playlistId, cancellationToken);
        var likedSongs = await _spotifyService.GetLikedSongsIfChanged(request.User.Market, cachedPlaylist?.SnapshotId);

        if (likedSongs is not null && cachedPlaylist is null)
        {
            await AddPlaylist(playlistId, likedSongs, cancellationToken);
        }

        if (likedSongs is not null && cachedPlaylist is not null)
        {
            await UpdatePlaylist(cachedPlaylist, likedSongs, cancellationToken);
        }

        // If likedSongs is null there is nothing to update.
    }

    private async Task AddPlaylist(string playlistId, LikedSongsDto apiResponse,
        CancellationToken cancellationToken)
    {
        var newPlaylist = new Playlist()
        {
            Id = playlistId,
            Name = "Liked Songs",
            SnapshotId = apiResponse.SnapshotId,
            Tracks = apiResponse.Tracks,
            Owner = _currentUserStore.User!.Adapt<Owner>(),
            Description = "",
        };

        _db.Playlists.Add(newPlaylist);
        await _db.SaveChangesAsync(cancellationToken);
    }

    private async Task UpdatePlaylist(Playlist cachedPlaylist, LikedSongsDto apiResponse,
        CancellationToken cancellationToken)
    {
        cachedPlaylist.SnapshotId = apiResponse.SnapshotId;

        await _db.Entry(cachedPlaylist).Collection(p => p.Tracks).LoadAsync(cancellationToken);
        cachedPlaylist.UpdateTracks(apiResponse.Tracks);

        await _db.SaveChangesAsync(cancellationToken);
    }
}
