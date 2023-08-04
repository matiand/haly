using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Features.Playlists.TotalDuration;

public interface ITotalDurationService
{
    Task<TotalDurationValue> FromPlaylistStore(string playlistId);
    Task<TotalDurationValue> FromQueryable(IQueryable<PlaylistTrack> queryable);
    TotalDurationValue FromTracks(IEnumerable<Track> tracks);
}
