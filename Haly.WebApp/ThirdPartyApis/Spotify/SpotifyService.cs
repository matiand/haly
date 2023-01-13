using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.Player;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Models;
using Mapster;
using Newtonsoft.Json;
using Track = Haly.WebApp.Models.Track;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public sealed class SpotifyService : IDisposable, ISpotifyService
{
    private readonly HttpClient _innerHttpClient;
    private readonly GeneratedSpotifyClient _spotifyClient;

    private const int PlaylistLimit = 50;
    // Their docs say that GET PlaylistTracks endpoint has a limit of 50, but actually it's 100
    private const int PlaylistTracksLimit = 100;
    private const int LikedSongsLimit = 50;

    public SpotifyService(IHttpClientFactory httpClientFactory, CurrentUserStore currentUserStore)
    {
        _innerHttpClient = httpClientFactory.CreateClient();
        _innerHttpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", currentUserStore.Token);

        _spotifyClient = new GeneratedSpotifyClient(_innerHttpClient, throwDeserializationErrors: false);
    }

    public async Task<User> GetCurrentUser()
    {
        var spotifyUser = await _spotifyClient.GetCurrentUsersProfileAsync();
        return spotifyUser.Adapt<User>();
    }

    public async Task<List<Playlist>> GetCurrentUserPlaylists()
    {
        var userPlaylists = new List<SimplifiedPlaylistObject>();
        var offset = 0;

        do
        {
            var response = await _spotifyClient.GetAListOfCurrentUsersPlaylistsAsync(offset: offset, limit: PlaylistLimit);
            userPlaylists.AddRange(response.Items);

            offset = response.Next is not null ? response.Offset + response.Limit : -1;
        } while (offset != -1);

        // We have to add order data to each playlist manually
        var mappedPlaylists = new List<Playlist>();
        for (var i = 0; i < userPlaylists.Count; i++)
        {
            var dto = userPlaylists[i].Adapt<Playlist>();
            dto.Order = i;
            mappedPlaylists.Add(dto);
        }

        return mappedPlaylists;
    }

    // Spotify documentation states that when you omit 'userMarket', the market
    // associated with user account that requests data will be used (based on
    // access token). From testing this seems not true, so when you need data
    // for your market, set 'userMarket' explicitly.
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
