using Haly.WebApp.Features.Artists;

namespace Haly.WebApp.Features.Albums.GetAlbum;

public record AlbumDetailedDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public string TypeName { get; init; }
    public string TotalDuration { get; set; }
    public List<ArtistBriefDto> Artists { get; init; }
    public List<AlbumTrackDto> Tracks { get; set; }
    public List<string> Copyrights { get; init; }
    public string ReleaseYear { get; init; }
    public string FormattedReleaseDate { get; init; }
}
