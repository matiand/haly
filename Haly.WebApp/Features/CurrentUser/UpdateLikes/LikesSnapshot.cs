namespace Haly.WebApp.Features.CurrentUser.UpdateLikes;

public class LikesSnapshot
{
    public int Total { get; set; }
    public string? LastTrackId { get; set; }

    public string SnapshotId => $"{Total} {LastTrackId}";

    public bool Equals(string? otherSnapshotId)
    {
        return SnapshotId == otherSnapshotId;
    }

}
