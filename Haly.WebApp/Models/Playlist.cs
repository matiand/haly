using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Models;

public class Playlist
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string SnapshotId { get; set; }
    public int LikesTotal { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public DateOnly? UpdatedAt { get; set; }

    [Column(TypeName = "jsonb")]
    public Owner Owner { get; set; }

    public List<PlaylistTrack> Tracks { get; set; }

    public bool IsPersonalized => Owner.Id == "spotify" && Regex.IsMatch(Name,
        "(Release Radar|Discover Weekly|Repeat|Time Capsule|Your Top| Mix)");

    public void UpdateModel(Playlist other, bool includingTracks = false, bool includingLikes = false)
    {
        Name = other.Name;
        SnapshotId = other.SnapshotId;
        Description = other.Description;
        ImageUrl = other.ImageUrl;
        Owner = other.Owner;
        UpdatedAt = DateOnly.FromDateTime(DateTime.Now);

        // Some requests don't include likes, so LikesTotal is equal to 0. In that case we don't
        // want to lose them so we skip updating them.
        if (includingLikes)
        {
            LikesTotal = other.LikesTotal;
        }

        if (includingTracks)
        {
            Tracks = other.Tracks;
        }
    }

    public void UpdateTracks(List<PlaylistTrack> otherTracks)
    {
        Tracks = otherTracks;
        UpdatedAt = DateOnly.FromDateTime(DateTime.Now);
    }
}
