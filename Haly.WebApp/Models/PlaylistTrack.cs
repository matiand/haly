using System.ComponentModel.DataAnnotations.Schema;

namespace Haly.WebApp.Models;

public class PlaylistTrack : Track
{
    // We can't use their id because it can be null.
    // My implementation for updating tracks triggers EFCore's diff algorithm to replace the entire
    // collection with fresh ids. This means that there is a risk of reaching the upper limit on ids
    // when using an integer index. By employing a composite index of (PlaylistId, PositionInPlaylist)
    // these problems are resolved.
    public string PlaylistId { get; set; }
    public int PositionInPlaylist { get; set; }

    public DateTimeOffset AddedAt { get; set; }
    public PlaylistTrackType Type { get; set; }

    [Column(TypeName = "jsonb")]
    public AlbumBrief Album { get; set; }
}

public enum PlaylistTrackType
{
    Song,
    Podcast,
}
