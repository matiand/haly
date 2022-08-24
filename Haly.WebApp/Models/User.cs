namespace Haly.WebApp.Models;

public class User
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Market { get; set; }
    public Plan Plan { get; set; }

    public List<Playlist> Playlists { get; set; }
}

public enum Plan
{
    Free,
    Premium,
}
