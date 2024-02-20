using Haly.WebApp.Features.Player;
using Haly.WebApp.Features.Users.GetUserPlaylists;

namespace Haly.WebApp.Features.Artists.GetArtist;

public record ArtistDetailedDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public IEnumerable<string> Genres { get; init; }
    public int FollowersTotal { get; init; }
    public bool IsFollowed { get; set; }

    public PlaylistCardDto? HighlightedPlaylist { get; set; }

    public IEnumerable<TrackDto> TopTracks { get; init; }
}
