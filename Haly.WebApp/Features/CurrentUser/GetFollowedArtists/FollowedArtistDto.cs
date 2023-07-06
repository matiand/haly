namespace Haly.WebApp.Features.CurrentUser.GetFollowedArtists;

public record FollowedArtistDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; set; }
    public int FollowersTotal { get; set; }
}
