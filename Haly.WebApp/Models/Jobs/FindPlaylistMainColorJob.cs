namespace Haly.WebApp.Models.Jobs;

public class FindPlaylistMainColorJob : BackgroundJob
{
    public string UserId { get; set; }
    public string PlaylistId { get; set; }

    public User User { get; set; }
}
