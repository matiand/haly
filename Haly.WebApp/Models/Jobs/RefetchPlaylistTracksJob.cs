namespace Haly.WebApp.Models.Jobs;

public class RefetchPlaylistTracksJob : BackgroundJob
{
    public string UserId { get; set; }
    public string PlaylistId { get; set; }

    public PrivateUser User { get; set; }

    public RefetchPlaylistTracksJob()
    {
    }

    public RefetchPlaylistTracksJob(PrivateUser user, Playlist playlist)
    {
        User = user;

        UserId = user.Id;
        PlaylistId = playlist.Id;
    }
}
