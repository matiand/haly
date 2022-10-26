using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Haly.WebApp.Models;

public class Track
{
    public int Id { get; set; }
    public string SpotifyId { get; set; }
    public string Name { get; set; }
    public int DurationInMs { get; set; }
    public DateTimeOffset AddedAt { get; set; }
    public TrackType Type { get; set; }

    [Column(TypeName = "jsonb")]
    public Album Album { get; set; }

    [Column(TypeName = "jsonb")]
    public List<Artist> Artists { get; set; }

    public string PlaylistId { get; set; }
    public string UserId { get; set; }
    public Playlist Playlist { get; set; }

    public string Duration => TimeSpan.FromMilliseconds(DurationInMs).ToString(@"m\:ss", CultureInfo.InvariantCulture);
}

public enum TrackType
{
    Song,
    Podcast,
}
