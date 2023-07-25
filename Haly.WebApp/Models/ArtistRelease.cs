namespace Haly.WebApp.Models;

public sealed class ArtistRelease
{
    public string Value { get; }

    private ArtistRelease(string value)
    {
        Value = value;
    }

    public static readonly ArtistRelease Album = new("album");
    public static readonly ArtistRelease Singles = new("single");
    public static readonly ArtistRelease Compilation = new("compilation");
    public static readonly ArtistRelease AppearsOn = new("appears_on");

    // Using multiple groups in Spotify API is currently broken.
    // public static readonly ArtistRelease Discography = new("album,single,compilation");
}
