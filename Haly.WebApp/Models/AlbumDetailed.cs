namespace Haly.WebApp.Models;

public record AlbumDetailed
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? ImageUrl { get; set; }
    public AlbumType Type { get; set; }
    public List<ArtistBrief> Artists { get; set; }
    public List<AlbumTrack> Tracks { get; set; }
    public List<string> Copyrights { get; set; }
    public DateOnly ReleaseDate { get; set; }
}
