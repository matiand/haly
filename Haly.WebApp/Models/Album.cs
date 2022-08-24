namespace Haly.WebApp.Models;

public class Album
{
    public string Id { get; set; }
    public string Name { get; set; }
    public List<Artist> Artists { get; set; }
}
