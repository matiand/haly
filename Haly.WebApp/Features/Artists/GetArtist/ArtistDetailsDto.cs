namespace Haly.WebApp.Features.Artists.GetArtist;

public record ArtistDetailsDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public IEnumerable<string> Genres { get; init; }
    public int FollowersTotal { get; init; }
}
