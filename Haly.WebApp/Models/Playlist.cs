using System.ComponentModel.DataAnnotations.Schema;

namespace Haly.WebApp.Models;

public class Playlist
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string SnapshotId { get; set; }

    [Column(TypeName = "jsonb")]
    public PlaylistMetadata Metadata { get; set; }

    public List<Track> Tracks { get; set; }

    public void UpdateModel(Playlist other, bool includingTracks = false, bool includingLikes = false)
    {
        Name = other.Name;
        SnapshotId = other.SnapshotId;

        // When want to update a playlist we first get it from Spotify, but sometimes we don't get the likes.
        // In that case we want to keep the old likes, we will fetch them later.
        if (!includingLikes)
        {
            var currentLikes = Metadata.LikesTotal;
            other.Metadata.LikesTotal = currentLikes;
        }
        Metadata = other.Metadata;

        if (includingTracks)
        {
            Tracks = other.Tracks;
        }
    }
}
