namespace Haly.WebApp.Features.Playlists;

public record PlaylistBriefDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string OwnerId { get; init; }
    public string? ImageUrl { get; init; }
}
