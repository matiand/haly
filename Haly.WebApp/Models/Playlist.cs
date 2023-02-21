using System.ComponentModel.DataAnnotations.Schema;

namespace Haly.WebApp.Models;

public class Playlist
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string SnapshotId { get; set; }

    [Column(TypeName = "jsonb")]
    public PlaylistMetadata Metadata { get; set; }

    public List<Track> Tracks { get; set; }
}
