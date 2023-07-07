namespace Haly.WebApp.Features.CurrentUser.GetFollowedArtists;

public record FollowedArtistDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
    public int FollowersTotal { get; init; }
}
