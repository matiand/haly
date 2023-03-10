namespace Haly.WebApp.Features.Playlists;

public class PlaylistMetadataDto
{
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public OwnerDto Owner { get; set; }
}
