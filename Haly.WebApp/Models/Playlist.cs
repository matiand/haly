using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Models;

public class Playlist
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string SnapshotId { get; set; }

    [Column(TypeName = "jsonb")]
    public PlaylistMetadata Metadata { get; set; }

    public List<PlaylistTrack> Tracks { get; set; }

    public bool IsPersonalized => Metadata.Owner.Id == "spotify" && Regex.IsMatch(Name,
        "(Release Radar|Discover Weekly|Repeat|Time Capsule|Your Top| Mix)");

    public void UpdateModel(Playlist other, bool includingTracks = false, bool includingLikes = false)
    {
        Name = other.Name;
        SnapshotId = other.SnapshotId;

        // When want to update a playlist we first get it from Spotify, but sometimes we don't get the likes.
        // In that case we want to keep the old likes, we will fetch them later.
        var oldLikes = Metadata.LikesTotal;
        Metadata = other.Metadata;
        if (!includingLikes)
        {
            Metadata.LikesTotal = oldLikes;
        }

        if (includingTracks)
        {
            Tracks = other.Tracks;
        }
    }
}
