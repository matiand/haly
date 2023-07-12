using Haly.WebApp.Features.Albums;
using Haly.WebApp.Features.Artists;
using Haly.WebApp.Models;

namespace Haly.WebApp.Features.Playlists;

public record PlaylistTrackDto
{
    public int PositionInPlaylist { get; init; }
    public string Name { get; init; }
    public string Duration { get; init; }
    public bool IsPlayable { get; init; }
    public bool IsExplicit { get; init; }
    public DateTimeOffset AddedAt { get; init; }
    public PlaylistTrackType Type { get; init; }

    public AlbumBriefDto Album { get; init; }
    public IEnumerable<ArtistBriefDto> Artists { get; init; }
}
