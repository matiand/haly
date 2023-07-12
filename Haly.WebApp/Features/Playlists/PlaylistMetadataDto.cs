namespace Haly.WebApp.Features.Playlists;

public record PlaylistMetadataDto
{
    public string? Description { get; init; }
    public string? ImageUrl { get; init; }
    public int LikesTotal { get; init; }
    public OwnerBriefDto Owner { get; init; }
}
