namespace Haly.WebApp.Features.CurrentUser;

public record UserDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string Market { get; init; }
    public bool CanUseSpotifyPlayer { get; set; }
}
