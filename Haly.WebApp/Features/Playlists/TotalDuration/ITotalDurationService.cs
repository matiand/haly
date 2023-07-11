using Haly.WebApp.Models;

namespace Haly.WebApp.Features.Playlists.TotalDuration;

public interface ITotalDurationService
{
    Task<TotalDurationValue> FromPlaylistStore(string playlistId);
    TotalDurationValue FromTracks(IEnumerable<Track> tracks);
}
