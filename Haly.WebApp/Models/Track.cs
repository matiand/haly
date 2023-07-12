using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Haly.WebApp.Models;

public class Track
{
    // Nullable, because tracks from 'Local Library' have no SpotifyId 
    public string? SpotifyId { get; set; }
    public string Name { get; set; }
    public int DurationInMs { get; set; }
    public bool IsPlayable { get; set; }
    public bool IsExplicit { get; set; }

    [Column(TypeName = "jsonb")]
    public List<ArtistBrief> Artists { get; set; }

    public string Duration => DurationInMs >= 3600000
        ? TimeSpan.FromMilliseconds(DurationInMs).ToString(@"h\:mm\:ss", CultureInfo.InvariantCulture)
        : TimeSpan.FromMilliseconds(DurationInMs).ToString(@"m\:ss", CultureInfo.InvariantCulture);
}
