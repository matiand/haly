using Haly.WebApp.Features.Artists;
using Haly.WebApp.Features.Player;
using Haly.WebApp.Features.Users.GetUserPlaylists;

namespace Haly.WebApp.Features.Search.SearchSpotify;

public record SpotifySearchResultsDto
{
    public List<ArtistCardDto>? Artists { get; init; }
    public List<ReleaseItemDto>? Albums { get; init; }
    public List<PlaylistCardDto>? Playlists { get; init; }
    public List<TrackDto>? Tracks { get; init; }
}
