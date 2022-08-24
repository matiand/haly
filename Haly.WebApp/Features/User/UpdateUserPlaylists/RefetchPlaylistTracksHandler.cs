using Haly.WebApp.Data;
using Haly.WebApp.Events;
using Haly.WebApp.Hubs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.User.UpdateUserPlaylists;

public class RefetchPlaylistTracksHandler : INotificationHandler<PlaylistUpserted>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotifyService;
    private readonly IHubContext<PlaylistHub, IPlaylistHubClient> _hubContext;

    public RefetchPlaylistTracksHandler(LibraryContext db, ISpotifyService spotifyService,
        IHubContext<PlaylistHub, IPlaylistHubClient> hubContext)
    {
        _db = db;
        _spotifyService = spotifyService;
        _hubContext = hubContext;
    }

    public async Task Handle(PlaylistUpserted notification, CancellationToken cancellationToken)
    {
        await _hubContext.Clients.All.PlaylistTracksRefetchStarted(notification.PlaylistId);

        var playlist = await _db.Playlists.FindAsync(new object[] { notification.PlaylistId }, cancellationToken);
        Console.WriteLine($"PlaylistChanged Playlist: {playlist?.Name}");
        ArgumentNullException.ThrowIfNull(playlist);

        var tracks = await _spotifyService.GetPlaylistTracks(notification.PlaylistId, notification.UserMarket);
        await _db.Database.ExecuteSqlInterpolatedAsync($"DELETE FROM \"Tracks\" WHERE \"PlaylistId\" = {notification.PlaylistId}",
            cancellationToken);
        playlist.Tracks = tracks;

        await _db.SaveChangesAsync(cancellationToken);
        await _hubContext.Clients.All.PlaylistTracksRefetchCompleted(notification.PlaylistId);
    }
}
