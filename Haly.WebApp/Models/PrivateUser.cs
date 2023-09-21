using System.ComponentModel.DataAnnotations.Schema;
using Haly.WebApp.Models.Jobs;

namespace Haly.WebApp.Models;

public class PrivateUser
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Market { get; set; }
    public string? ImageUrl { get; set; }
    public Plan Plan { get; set; }

    [Column(TypeName = "jsonb")]
    public List<string> LinkedPlaylistsOrder { get; set; } = new();

    public List<RefetchPlaylistTracksJob> RefetchPlaylistTracksJobs { get; set; }

    public bool CanStreamTracks => Plan is Plan.Premium;
    public string LikedSongsCollectionId => $"LikesOf_{Id}";
}

public enum Plan
{
    Free,
    Premium,
}
