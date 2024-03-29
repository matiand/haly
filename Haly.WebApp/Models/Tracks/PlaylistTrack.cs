using System.ComponentModel.DataAnnotations.Schema;

namespace Haly.WebApp.Models.Tracks;

public class PlaylistTrack : TrackBase
{
    // We can't use their id because it can be null.
    // My implementation for updating tracks triggers EFCore's diff algorithm to replace the entire
    // collection with fresh ids. This means that there is a risk of reaching the upper limit on ids
    // when using an integer index. By employing a composite index of (PlaylistId, PositionInPlaylist)
    // these problems are resolved.
    public string PlaylistId { get; set; }
    public int PositionInPlaylist { get; set; }

    public int PositionInAlbum { get; set; }

    public DateTimeOffset AddedAt { get; set; }

    [Column(TypeName = "jsonb")]
    public AlbumBrief Album { get; set; }

    [Column(TypeName = "jsonb")]
    public PlaylistTrackQueryData QueryData { get; set; }
}
