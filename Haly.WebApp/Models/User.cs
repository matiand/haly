namespace Haly.WebApp.Models;

public class User
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Market { get; set; }
    public Plan Plan { get; set; }

    public List<Playlist> OwnedPlaylists { get; set; }

    public bool CanUseSpotifyPlayer => Plan is Plan.Premium;
}

public enum Plan
{
    Free,
    Premium,
}
