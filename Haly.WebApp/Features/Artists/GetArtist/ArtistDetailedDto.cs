using Haly.WebApp.Features.Albums.GetAlbum;

namespace Haly.WebApp.Features.Artists.GetArtist;

public record ArtistDetailedDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public IEnumerable<string> Genres { get; init; }
    public int FollowersTotal { get; init; }

    public CardDto? HighlightedPlaylist { get; set; }

    public List<AlbumTrackDto> TopTracks { get; set; }
}

public record CardDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
}
