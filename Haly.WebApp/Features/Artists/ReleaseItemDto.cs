namespace Haly.WebApp.Features.Artists;

public record ReleaseItemDto
{
    public string Id { get; init; }
    public string Uri { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public string Type { get; init; }
    public DateOnly ReleaseDate { get; init; }
    public int ReleaseYear { get; init; }
    public IEnumerable<ArtistBriefDto> Artists { get; set; }
}
