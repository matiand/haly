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

    /// <summary>
    /// Starts a new playback context.
    /// </summary>
    /// <param name="contextUri">The URI of the context.</param>
    /// <param name="trackUri">The URI of the track belonging to that context. Can be null. If specified, this track will start playing.</param>
    Task UpdatePlayback(string contextUri, string? trackUri);

    /// <summary>
    /// Starts a playback of a single track.
    /// </summary>
    /// <param name="trackUri">The URI of the track to play.</param>
    Task UpdatePlayback(string trackUri);

    Task AddToQueue(IEnumerable<string> trackUris);
}
