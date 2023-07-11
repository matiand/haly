using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.TotalDuration;

public class TotalDurationService : ITotalDurationService
{
    private readonly LibraryContext _db;

    public TotalDurationService(LibraryContext db)
    {
        _db = db;
    }

    public async Task<TotalDurationValue> FromPlaylistStore(string playlistId)
    {
        var duration = await _db.Tracks.Where(t => t.PlaylistId == playlistId).SumAsync(t => t.DurationInMs);

        return new TotalDurationValue(duration);
    }

    public TotalDurationValue FromTracks(IEnumerable<PlaylistTrack> tracks)
    {
        var duration = tracks.Sum(t => t.DurationInMs);

        return new TotalDurationValue(duration);
    }
}
