namespace Haly.WebApp.Features.Users.GetUserPlaylists;

public record PlaylistCardDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
}
