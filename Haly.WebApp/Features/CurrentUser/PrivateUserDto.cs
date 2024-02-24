namespace Haly.WebApp.Features.CurrentUser;

public record PrivateUserDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string Market { get; init; }
    public string? ImageUrl { get; init; }
    public bool IsPlaybackAllowed { get; init; }
    public string LikedSongsCollectionId { get; init; }
}
