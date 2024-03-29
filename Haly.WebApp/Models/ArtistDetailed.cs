using Haly.WebApp.Models.Cards;
using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Models;

public record ArtistDetailed
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public List<string> Genres { get; init; }
    public int FollowersTotal { get; init; }

    public PlaylistCard? TopFeaturedPlaylist { get; set; }

    public List<Track> TopTracks { get; set; }
}
