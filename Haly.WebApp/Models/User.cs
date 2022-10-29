using Haly.WebApp.Models.Jobs;

namespace Haly.WebApp.Models;

public class User
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Market { get; set; }
    public Plan Plan { get; set; }

    public List<Playlist> LinkedPlaylists { get; set; }
    public List<RefetchPlaylistTracksJob> RefetchPlaylistTracksJobs { get; set; }
    public List<FindPlaylistMainColorJob> FindPlaylistMainColorJobs { get; set; }

    public bool CanUseSpotifyPlayer => Plan is Plan.Premium;
}

public enum Plan
{
    Free,
    Premium,
}
