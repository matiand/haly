using Haly.WebApp.Features.Albums;
using Haly.WebApp.Features.Artists;

namespace Haly.WebApp.Features.Playlists;

public record PlaylistTrackDto
{
    public string? SpotifyId { get; init; }
    public int PositionInPlaylist { get; init; }
    public string Name { get; init; }
    public string Duration { get; init; }
    public string? Uri { get; init; }
    public bool IsPlayable { get; init; }
    public bool IsExplicit { get; init; }
    public bool IsSong { get; init; }
    public DateTimeOffset AddedAt { get; init; }

    public AlbumBriefDto Album { get; init; }
    public IEnumerable<ArtistBriefDto> Artists { get; init; }
}
