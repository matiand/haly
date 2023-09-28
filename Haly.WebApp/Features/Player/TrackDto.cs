using Haly.WebApp.Features.Albums;
using Haly.WebApp.Features.Artists;

namespace Haly.WebApp.Features.Player;

public record TrackDto
{
    public string? SpotifyId { get; init; }
    public string Name { get; init; }
    public string Duration { get; init; }
    public bool IsPlayable { get; init; }
    public bool IsExplicit { get; init; }
    public bool IsSong { get; init; }

    public AlbumBriefDto Album { get; init; }
    public IEnumerable<ArtistBriefDto> Artists { get; init; }
}