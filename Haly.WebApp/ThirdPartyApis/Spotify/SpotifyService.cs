using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Features.Player;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Features.XSpotifyToken;
using Haly.WebApp.Models;
using Mapster;
using Newtonsoft.Json;
using Track = Haly.WebApp.Models.Track;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public sealed class SpotifyService : IDisposable, ISpotifyService
{
    private readonly HttpClient _innerHttpClient;
    private readonly GeneratedSpotifyClient _spotifyClient;

    // Their docs say that GET PlaylistTracks endpoint has a limit of 50, but actually it's 100
    private const int PlaylistTracksLimit = 100;
    private const int LikedSongsLimit = 50;

    public SpotifyService(IHttpClientFactory httpClientFactory, SpotifyAccessToken accessToken)
    {
        _innerHttpClient = httpClientFactory.CreateClient();
        _innerHttpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken.Value);
        Console.WriteLine($"Calling Spotify API with {_innerHttpClient.DefaultRequestHeaders.Authorization}");

        _spotifyClient = new GeneratedSpotifyClient(_innerHttpClient, throwDeserializationErrors: false);
    }

    public async Task<User> GetCurrentUser()
    {
        var spotifyUser = await _spotifyClient.GetCurrentUsersProfileAsync();
        return spotifyUser.Adapt<User>();
    }

    public async Task<List<Playlist>> GetCurrentUserPlaylists()
    {
        var spotifyPlaylists = await _spotifyClient.GetAListOfCurrentUsersPlaylistsAsync();

        return spotifyPlaylists.Items.Adapt<List<Playlist>>();
    }

    public async Task<List<Track>> GetPlaylistTracks(string playlistId, string userMarket)
    {
        var spotifyTracks = new List<PlaylistTrackObject>();
        var offset = 0;

        do
        {
            var response = await _spotifyClient.GetPlaylistsTracksAsync(playlistId, offset: offset,
                limit: PlaylistTracksLimit,
                market: userMarket);
            spotifyTracks.AddRange(response.Items);

            offset = response.Next is not null ? response.Offset + response.Limit : -1;
        } while (offset != -1);

        return spotifyTracks.Adapt<List<Track>>();
    }

    public async Task<List<Track>> GetLikedSongs(string userMarket)
    {
        var likedSongs = new List<SavedTrackObject>();
        var offset = 0;

        do
        {
            var response = await _spotifyClient.GetUsersSavedTracksAsync(offset: offset,
                limit: LikedSongsLimit,
                market: userMarket);
            likedSongs.AddRange(response.Items);

            offset = response.Next is not null ? response.Offset + response.Limit : -1;
        } while (offset != -1);

        return likedSongs.Adapt<List<Track>>();
    }

    public async Task<List<DeviceDto>> GetAvailableDevices()
    {
        var response = await _spotifyClient.GetAUsersAvailableDevicesAsync();
        return response.Devices.Adapt<List<DeviceDto>>();
    }

    public void Dispose()
    {
        _innerHttpClient.Dispose();
    }
}
