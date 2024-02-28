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
    // https://community.spotify.com/t5/Spotify-for-Developers/Pagination-does-not-work-on-v1-artists-id-albums/td-p/5644793
    // https://community.spotify.com/t5/Spotify-for-Developers/Issue-with-pagination-in-quot-Get-Artist-s-Albums-quot-endpoint/td-p/5906464
    // public static readonly ArtistRelease Discography = new("album,single,compilation");
}
