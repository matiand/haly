namespace Haly.WebApp.Features.CurrentUser.GetTopArtists;

public record TopArtistDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public IEnumerable<string> Genres { get; init; }
}
