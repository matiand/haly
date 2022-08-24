namespace Haly.WebApp.Models;

public class Playlist
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string SnapshotId { get; set; }
    public List<Track> Tracks { get; set; } = new();

    public User Owner { get; set; }
    public string OwnerId { get; set; }
}
