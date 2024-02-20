using Haly.WebApp.Models.Cards;
using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Models.Search;

public record SpotifySearchResult
{
    public List<ArtistCard>? Artists { get; init; }
    public List<ReleaseItem>? Albums { get; init; }
    public List<PlaylistCard>? Playlists { get; init; }
    public List<Track>? Tracks { get; init; }
}
