using Haly.WebApp.Models;

namespace Haly.WebApp.Features.Albums.GetAlbum;

public record AlbumDetailedDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public string TypeName { get; init; }
    public string TotalDuration { get; set; }
    public List<ArtistBrief> Artists { get; init; }
    public List<AlbumTrack> Tracks { get; set; }
    public List<string> Copyrights { get; init; }
    public string ReleaseYear { get; init; }
    public string FormattedReleaseDate { get; init; }
}
