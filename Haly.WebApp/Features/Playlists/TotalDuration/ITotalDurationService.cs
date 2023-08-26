using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Features.Playlists.TotalDuration;

public interface ITotalDurationService
{
    Task<TotalDurationValue> FromPlaylistStore(string playlistId);
    Task<TotalDurationValue> FromQueryable(IQueryable<TrackBase> queryable);
    TotalDurationValue FromTracks(IEnumerable<TrackBase> tracks);
}
