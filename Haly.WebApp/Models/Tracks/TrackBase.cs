using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Haly.WebApp.Models.Tracks;

public class TrackBase
{
    // Nullable, because tracks from 'Local Library' don't have one.
    public string? Id { get; set; }

    // Spotify uses 'Track relinking' for tracks that are no longer playable. They try to find
    // another instance of that track that is available in user's market. Those tracks have
    // PlaybackId that differs from Id.
    // From my testing it seems that we can supply the 'old' Id for playback and they will 'relink'
    // it behind the scenes. Still gonna store it just in case.
    // Nullable, because tracks from 'Local Library' don't have one.
    public string? PlaybackId { get; set; }

    public string Name { get; set; }
    public int DurationInMs { get; set; }
    public bool IsPlayable { get; set; }
    public bool IsExplicit { get; set; }

    public TrackType Type { get; set; }

    [Column(TypeName = "jsonb")]
    public List<ArtistBrief> Artists { get; set; }

    public string Duration => DurationInMs >= 3600000
        ? TimeSpan.FromMilliseconds(DurationInMs).ToString(@"h\:mm\:ss", CultureInfo.InvariantCulture)
        : TimeSpan.FromMilliseconds(DurationInMs).ToString(@"m\:ss", CultureInfo.InvariantCulture);

    public bool IsSong => Type == TrackType.Song;

    public string? Uri => Id is not null
        ? $"spotify:{(Type == TrackType.Song ? "track" : "episode")}:{Id}"
        : null;
}
