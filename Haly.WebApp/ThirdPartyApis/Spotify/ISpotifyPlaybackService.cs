using Haly.WebApp.Models;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public interface ISpotifyPlaybackService
{
    Task<PlaybackState?> GetPlaybackState();
    Task TransferPlayback(string deviceId);
    Task ShufflePlayback(bool state);
    Task SetPlaybackRepeatMode(string repeatMode);
    Task Play();
    Task Pause();
    Task UpdatePlayback(string contextUri, string? trackUri);
    Task UpdatePlayback(IEnumerable<string> trackUri);
}
