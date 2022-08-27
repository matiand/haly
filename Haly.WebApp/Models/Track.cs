using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Haly.WebApp.Models;

public class Track
{
    // Tracks can belong to many Playlists and we allow a Playlist to have many Tracks with same SpotifyId
    // Id column is only used, because EFCore needs a primary key
    public int Id { get; set; }
    public string SpotifyId { get; set; }
    public string Name { get; set; }
    public int DurationInMs { get; set; }
    public DateTimeOffset AddedAt { get; set; }

    [Column(TypeName = "jsonb")]
    public Album Album { get; set; }

    [Column(TypeName = "jsonb")]
    public List<Artist> Artists { get; set; }

    public string PlaylistId { get; set; }
    public Playlist Playlist { get; set; }

    public string Duration => TimeSpan.FromMilliseconds(DurationInMs).ToString(@"m\:ss", CultureInfo.InvariantCulture);
}
