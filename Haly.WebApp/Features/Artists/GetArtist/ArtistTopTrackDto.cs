using Haly.WebApp.Features.Albums;

namespace Haly.WebApp.Features.Artists.GetArtist;

public record ArtistTopTrackDto
{
    public string SpotifyId { get; init; }
    public string Name { get; init; }
    public string Duration { get; init; }
    public bool IsPlayable { get; init; }
    public bool IsExplicit { get; init; }

    public AlbumBriefDto Album { get; init; }
    public IEnumerable<ArtistBriefDto> Artists { get; init; }
}
