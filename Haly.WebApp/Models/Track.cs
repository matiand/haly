using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Haly.WebApp.Models;

public class Track
{
    // We can't use their id because it can be null (see below).
    // My implementation for updating tracks triggers EFCore's diff algorithm to replace the entire
    // collection with fresh ids. This means that there is a risk of reaching the upper limit on ids
    // when using an integer index. By employing a composite index of (PlaylistId, PositionInPlaylist)
    // these problems are resolved.
    public string PlaylistId { get; set; }
    public int PositionInPlaylist { get; set; }

    // Nullable, because tracks from 'Local Library' have no SpotifyId 
    public string? SpotifyId { get; set; }
    public string Name { get; set; }
    public int DurationInMs { get; set; }
    public DateTimeOffset AddedAt { get; set; }
    public TrackType Type { get; set; }

    [Column(TypeName = "jsonb")]
    public Album Album { get; set; }

    [Column(TypeName = "jsonb")]
    public List<Artist> Artists { get; set; }

    public string Duration => DurationInMs >= 3600000
        ? TimeSpan.FromMilliseconds(DurationInMs).ToString(@"h\:mm\:ss", CultureInfo.InvariantCulture)
        : TimeSpan.FromMilliseconds(DurationInMs).ToString(@"m\:ss", CultureInfo.InvariantCulture);
}

public enum TrackType
{
    Song,
    Podcast,
}
