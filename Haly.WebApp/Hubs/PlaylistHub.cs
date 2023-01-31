using Microsoft.AspNetCore.SignalR;

namespace Haly.WebApp.Hubs;

public interface IPlaylistHubClient
{
    public Task PlaylistsWithOldTracks(IEnumerable<string> playlistIds);
}

public class PlaylistHub : Hub<IPlaylistHubClient>
{
}
