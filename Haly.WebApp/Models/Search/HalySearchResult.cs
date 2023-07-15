using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Models.Search;

public record HalySearchResult
{
    public List<Playlist> Playlists { get; init; }
    public List<PlaylistTrack> Tracks { get; init; }
}
