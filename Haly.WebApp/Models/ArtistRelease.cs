namespace Haly.WebApp.Models;

public sealed class ArtistRelease
{
    public string Value { get; }

    private ArtistRelease(string value)
    {
        Value = value;
    }

    public static readonly ArtistRelease Discography = new("album,single,compilation");
    public static readonly ArtistRelease AppearsOn = new("appears_on");
}
