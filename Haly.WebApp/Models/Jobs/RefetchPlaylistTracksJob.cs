namespace Haly.WebApp.Models.Jobs;

public class RefetchPlaylistTracksJob : BackgroundJob
{
    public string UserId { get; set; }
    public string PlaylistId { get; set; }

    public User User { get; set; }

    public RefetchPlaylistTracksJob()
    {
    }

    public RefetchPlaylistTracksJob(User user, Playlist playlist)
    {
        User = user;
        UserId = user.Id;
        PlaylistId = playlist.Id;
    }
}
