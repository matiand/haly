namespace Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;

// Class for calculating the snapshotId of the 'Liked Songs' collection. Useful for comparing if the
// collection has changed. We use a simple approach that should work 95% of the time.
public record LikedSongsSnapshot
{
    public int Total { get; set; }
    public string? LastTrackId { get; set; }

    public string SnapshotId => $"{Total} {LastTrackId}";

    public bool Equals(string? otherSnapshotId)
    {
        return SnapshotId == otherSnapshotId;
    }
}
