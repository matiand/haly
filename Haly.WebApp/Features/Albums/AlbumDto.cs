namespace Haly.WebApp.Features.Albums;

public record AlbumBriefDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
}
