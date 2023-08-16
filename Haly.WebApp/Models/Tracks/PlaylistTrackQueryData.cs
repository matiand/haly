using System.Text.RegularExpressions;

namespace Haly.WebApp.Models.Tracks;

/// <summary>
/// Represents data used for easier querying and searching of playlist tracks.
/// </summary>
public class PlaylistTrackQueryData
{
    public PlaylistTrackQueryData()
    {
    }

    public PlaylistTrackQueryData(string trackName, AlbumBrief album, List<ArtistBrief> artists)
    {
        Name = TrimArticles(trackName);
        ArtistName = TrimArticles(artists.FirstOrDefault()?.Name ?? "");
        AlbumName = TrimArticles(album.Name);

        AllArtistNames = string.Join(separator: ' ', artists.Select(a => a.Name));
    }

    // These properties are used for ordering tracks. We have to ingore articles ('the', 'a', 'an')
    // from strings and this approach seems easier than complicated SQL queries.
    public string Name { get; set; }
    public string ArtistName { get; set; }
    public string AlbumName { get; set; }

    // This is used when searching for artists. We need it, because Artists is a jsonb array column
    public string AllArtistNames { get; set; }

    private static string TrimArticles(string str)
    {
        return Regex.Replace(str, @"^(the|a|an)\s", "", RegexOptions.IgnoreCase);
    }
}
