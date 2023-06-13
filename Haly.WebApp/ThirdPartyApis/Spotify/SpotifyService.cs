using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Models;
using Mapster;
using Track = Haly.WebApp.Models.Track;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public sealed class SpotifyService : ISpotifyService
{
    private readonly GeneratedSpotifyClient _spotifyClient;
    private readonly ISpotifyEndpointCollector _endpointCollector;

    private const int PlaylistLimit = 50;

    // Their docs say that GET PlaylistTracks endpoint has a limit of 50, but actually it's 100
    private const int PlaylistTracksLimit = 100;
    private const int LikedSongsLimit = 50;

    public SpotifyService(HttpClient httpClient, CurrentUserStore currentUserStore,
        ISpotifyEndpointCollector endpointCollector)
    {
        httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", currentUserStore.Token);

        _spotifyClient = new GeneratedSpotifyClient(httpClient, throwDeserializationErrors: false);
        _endpointCollector = endpointCollector;
    }

    public async Task<User> GetCurrentUser()
    {
        var spotifyUser = await _spotifyClient.GetCurrentUsersProfileAsync();
        return spotifyUser.Adapt<User>();
    }

    public async Task<CurrentUserPlaylistsDto> GetCurrentUserPlaylists()
    {
        var userPlaylists =
            await _endpointCollector.FetchConcurrently(
                endpointFn: (limit, offset) =>
                    _spotifyClient.GetAListOfCurrentUsersPlaylistsAsync(limit, offset),
                dataFn: pagingObj => pagingObj.Items,
                endpointLimit: PlaylistLimit, maxConcurrentRequests: 2);

        var playlistsDto = userPlaylists.Adapt<List<Playlist>>();
        var orderDto = userPlaylists.Select(p => p.Id).ToList();

        return new CurrentUserPlaylistsDto(playlistsDto, orderDto);
    }

    // Spotify documentation states that when you omit 'userMarket', the market
    // associated with user account that requests the data will be used (based on
    // access token). From testing this seems not true, so when you need data
    // for your market, set 'userMarket' explicitly.
    public async Task<Playlist?> GetPlaylistWithTracks(string playlistId, string userMarket)
    {
        // GetPlaylistAsync returns playlist with its first 100 tracks
        var playlist = await _spotifyClient.GetPlaylistAsync(playlistId, userMarket);
        var remainingTracks = new List<PlaylistTrackObject>();

        if (playlist.Tracks.Next is not null)
        {
            remainingTracks = await _endpointCollector.FetchConcurrently(
                endpointFn: (limit, offset) =>
                    _spotifyClient.GetPlaylistsTracksAsync(playlistId, userMarket, limit: limit, offset: offset),
                dataFn: pagingObj => pagingObj.Items,
                endpointLimit: PlaylistTracksLimit, maxConcurrentRequests: 4, startingOffset: playlist.Tracks.Limit);
        }

        playlist.Tracks.Items = playlist.Tracks.Items.Concat(remainingTracks).ToList();

        var playlistDto = playlist.Adapt<Playlist>();
        playlistDto.Tracks = playlistDto.Tracks.AnnotateWithPosition();

        return playlistDto;
    }

    public async Task<List<Track>> GetPlaylistTracks(string playlistId, string userMarket)
    {
        var tracksDto = await _endpointCollector.FetchConcurrently(
            endpointFn: (limit, offset) =>
                _spotifyClient.GetPlaylistsTracksAsync(playlistId, userMarket, limit: limit, offset: offset),
            dataFn: pagingObj => pagingObj.Items,
            endpointLimit: PlaylistTracksLimit, maxConcurrentRequests: 4);

        return tracksDto
            .Adapt<List<Track>>()
            .AnnotateWithPosition();
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
}
