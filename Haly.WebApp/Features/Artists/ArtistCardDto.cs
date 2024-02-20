namespace Haly.WebApp.Features.Artists;

public record ArtistCardDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public int FollowersTotal { get; init; }
    public IEnumerable<string> Genres { get; init; }
}
