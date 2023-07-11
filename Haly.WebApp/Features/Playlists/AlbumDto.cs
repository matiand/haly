namespace Haly.WebApp.Features.Playlists;

public record AlbumDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
}
