namespace Haly.WebApp.Features.Playlists;

public class PlaylistMetadataDto
{
    public string? Description { get; init; }
    public string? ImageUrl { get; init; }
    public OwnerDto Owner { get; init; }
}
