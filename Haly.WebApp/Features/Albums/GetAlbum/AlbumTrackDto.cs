using Haly.WebApp.Features.Artists;

namespace Haly.WebApp.Features.Albums.GetAlbum;

public record AlbumTrackDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string Duration { get; init; }
    public bool IsPlayable { get; init; }
    public bool IsExplicit { get; init; }

    public IEnumerable<ArtistBriefDto> Artists { get; init; }
}
