namespace Haly.WebApp.Features.Artists.GetArtist;

public record ArtistDetailedDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public IEnumerable<string> Genres { get; init; }
    public int FollowersTotal { get; init; }
    public bool IsFollowed { get; set; }

    public HighlightedPlaylistDto? HighlightedPlaylist { get; set; }

    public IEnumerable<ArtistTopTrackDto> TopTracks { get; init; }
}
