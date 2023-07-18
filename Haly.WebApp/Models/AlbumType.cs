namespace Haly.WebApp.Models;

public sealed class AlbumType
{
    private string Name { get; }

    private AlbumType(string name)
    {
        Name = name;
    }

    public static readonly AlbumType Album = new("Album");
    public static readonly AlbumType OneSong = new("Single");
    public static readonly AlbumType Ep = new("EP");
    public static readonly AlbumType Compilation = new("Compilation");

    public override string ToString()
    {
        return Name;
    }
}
