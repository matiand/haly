namespace Haly.WebApp.Features.User;

public record UserDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string Market { get; init; }
    public bool CanUseSpotifyPlayer { get; set; }
}
