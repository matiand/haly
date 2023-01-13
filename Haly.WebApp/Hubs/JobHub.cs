namespace Haly.WebApp.Hubs;

public interface IJobHubClient
{
    public Task UserPlaylists(int stalePlaylistCount);
    public Task PlaylistTracksRefetchCompleted();
}

public class JobHub
{

}
