using Microsoft.AspNetCore.SignalR;

namespace Haly.WebApp.Hubs;

public interface IPlaylistHubClient
{
    public Task PlaylistTracksRefetchStarted(string playlistId);
    public Task PlaylistTracksRefetchCompleted(string playlistId);
}

public class PlaylistHub : Hub<IPlaylistHubClient>
{
}
