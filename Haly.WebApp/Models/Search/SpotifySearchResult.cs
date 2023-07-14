namespace Haly.WebApp.Models.Search;

public record SpotifySearchResult
{
    public List<object> Artists { get; init; }
    public List<object> Albums { get; init; }
    public List<Playlist> Playlists { get; init; }
    public List<object> Tracks { get; init; }
}
