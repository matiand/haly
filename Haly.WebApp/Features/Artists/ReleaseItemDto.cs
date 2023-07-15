using Haly.WebApp.Models;

namespace Haly.WebApp.Features.Artists;

public record ReleaseItemDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public int ReleaseYear { get; init; }
    public AlbumType Type { get; init; }
}
