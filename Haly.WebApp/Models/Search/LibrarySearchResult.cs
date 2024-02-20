using Haly.WebApp.Models.Cards;
using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Models.Search;

public record LibrarySearchResult
{
    public List<PlaylistCard> Playlists { get; init; }
    public List<Track> Tracks { get; init; }
}
