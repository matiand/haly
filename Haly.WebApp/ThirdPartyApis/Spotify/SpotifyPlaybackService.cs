using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public sealed class SpotifyPlaybackService : ISpotifyPlaybackService
{
    private readonly GeneratedSpotifyClient _spotifyClient;

    public SpotifyPlaybackService(GeneratedSpotifyClient spotifyClient)
    {
        _spotifyClient = spotifyClient;
    }

    public async Task<PlaybackState?> GetPlaybackState()
    {
        try
        {
            var response = await _spotifyClient.GetInformationAboutTheUsersCurrentPlaybackAsync();
            return response.Adapt<PlaybackState>();
        }
        catch (ApiException e)
        {
            if (e.StatusCode == StatusCodes.Status204NoContent)
            {
                return null;
            }

            throw;
        }
    }

    public Task TransferPlayback(string deviceId)
    {
        var body = new Body17()
        {
            Device_ids = new List<string> { deviceId },
            Play = true,
        };

        return _spotifyClient.TransferAUsersPlaybackAsync(body);
    }

    public Task ShufflePlayback(bool state)
    {
        return _spotifyClient.ToggleShuffleForUsersPlaybackAsync(state);
    }

    public Task SetPlaybackRepeatMode(string repeatMode)
    {
        return _spotifyClient.SetRepeatModeOnUsersPlaybackAsync(repeatMode);
    }

    public Task Play()
    {
        return _spotifyClient.StartAUsersPlaybackAsync(device_id: null, body: new());
    }

    public Task Pause()
    {
        return _spotifyClient.PauseAUsersPlaybackAsync(device_id: null);
    }

    public Task UpdatePlayback(string contextUri, string? trackUri)
    {
        var offset = trackUri is not null ? new { uri = trackUri } : null;
        var body = new Body18()
        {
            Context_uri = contextUri,
            Offset = offset!,
            Position_ms = 0,
        };

        return _spotifyClient.StartAUsersPlaybackAsync(device_id: null, body);
    }

    public Task UpdatePlayback(IEnumerable<string> trackUri)
    {
        var body = new Body18()
        {
            Offset = new { uri = trackUri.ToArray() },
            Position_ms = 0,
        };

        return _spotifyClient.StartAUsersPlaybackAsync(device_id: null, body);
    }
}
