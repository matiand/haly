namespace Haly.WebApp.Models;

public class PublicUser
{
    public string Id { get; init; }
    public string Name { get; init; }
    public int FollowersTotal { get; init; }
    public string? ImageUrl { get; init; }
}
