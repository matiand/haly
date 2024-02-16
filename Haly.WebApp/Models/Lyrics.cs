namespace Haly.WebApp.Models;

public class Lyrics
{
    // We use Track.PlaybackId as the id. We don't use a one-to-one relationship, because our
    // database only stores tracks from playlists and we want to show the lyrics for albums as well.
    public string Id { get; set; }

    // Url to the GENIUS page containing the lyrics. Can be null, because some songs just don't have lyrics.
    public string? GeniusUrl { get; set; }

    public Lyrics(string id, string? geniusUrl)
    {
        Id = id;
        GeniusUrl = geniusUrl;
    }
}
