using Haly.WebApp.Data;
using Haly.WebApp.Models.Tracks;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.TotalDuration;

public class TotalDurationService(LibraryContext db) : ITotalDurationService
{
    public async Task<TotalDurationValue> FromPlaylistStore(string playlistId)
    {
        var duration = await db.PlaylistTracks.Where(t => t.PlaylistId == playlistId).SumAsync(t => t.DurationInMs);

        return new TotalDurationValue(duration);
    }

    public async Task<TotalDurationValue> FromQueryable(IQueryable<TrackBase> queryable)
    {
        var duration = await queryable.SumAsync(t => t.DurationInMs);

        return new TotalDurationValue(duration);
    }

    public TotalDurationValue FromTracks(IEnumerable<TrackBase> tracks)
    {
        var duration = tracks.Sum(t => t.DurationInMs);

        return new TotalDurationValue(duration);
    }
}
