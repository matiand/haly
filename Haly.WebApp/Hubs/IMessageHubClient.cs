namespace Haly.WebApp.Hubs;

public interface IMessageHubClient
{
    public Task PlaylistsWithOldTracks(IEnumerable<string> playlistIds);
}