namespace Haly.WebApp.Features.Artists.GetArtist;

public record HighlightedPlaylistDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public string OwnerName { get; init; }
}
