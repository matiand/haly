namespace Haly.WebApp.Features.Users.GetUser;

public class UserProfileDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public int FollowersTotal { get; init; }
    public string? ImageUrl { get; init; }
    
    public bool IsFollowed  { get; set; }
}
