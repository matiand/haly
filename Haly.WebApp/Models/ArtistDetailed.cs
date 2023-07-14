using Haly.WebApp.Models.Cards;

namespace Haly.WebApp.Models;

public record ArtistDetailed
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public List<string> Genres { get; init; }
    public int FollowersTotal { get; init; }

    public Card? TopFeaturedPlaylist { get; set; }

    public List<AlbumTrack> TopTracks { get; set; }
}
