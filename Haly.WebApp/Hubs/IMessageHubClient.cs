namespace Haly.WebApp.Hubs;

public interface IMessageHubClient
{
    public Task PlaylistsWithOldTracks(IEnumerable<string> playlistIds);
    public Task PlaylistUpdated(string playlistId);
    public Task CollectingNewReleases(int artistsLeft);
}
