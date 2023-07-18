using System.Globalization;
using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Models;

public record AlbumDetailed
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public AlbumType Type { get; init; }
    public List<ArtistBrief> Artists { get; init; }
    public List<AlbumTrack> Tracks { get; set; }
    public List<string> Copyrights { get; init; }
    public DateOnly ReleaseDate { get; init; }

    public int ReleaseYear => ReleaseDate.Year;

    public string FormattedReleaseDate =>
        ReleaseDate switch
        {
            { Day: 1, Month: 1 } => ReleaseDate.ToString("yyyy", CultureInfo.InvariantCulture),
            _ => ReleaseDate.ToString("MMMM d, yyyy", CultureInfo.InvariantCulture),
        };
}
