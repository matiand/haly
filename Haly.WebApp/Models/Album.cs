namespace Haly.WebApp.Models;

public class Album
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? ImageUrl { get; set; }
    public List<Artist> Artists { get; set; }
}
