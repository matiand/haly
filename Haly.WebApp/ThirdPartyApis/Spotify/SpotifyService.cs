using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Models;
using Mapster;
using Track = Haly.WebApp.Models.Track;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public sealed class SpotifyService : ISpotifyService
{
    private readonly GeneratedSpotifyClient _spotifyClient;

    private const int PlaylistLimit = 50;

    // Their docs say that GET PlaylistTracks endpoint has a limit of 50, but actually it's 100
    private const int PlaylistTracksLimit = 100;
    private const int LikedSongsLimit = 50;

    public SpotifyService(HttpClient httpClient, CurrentUserStore currentUserStore)
    {
        httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", currentUserStore.Token);

        _spotifyClient = new GeneratedSpotifyClient(httpClient, throwDeserializationErrors: false);
    }

    public async Task<User> GetCurrentUser()
    {
        var spotifyUser = await _spotifyClient.GetCurrentUsersProfileAsync();
        return spotifyUser.Adapt<User>();
    }

    public async Task<CurrentUserPlaylistsDto> GetCurrentUserPlaylists()
    {
        var userPlaylists = new List<SimplifiedPlaylistObject>();
        var offset = 0;

        do
        {
            var response =
                await _spotifyClient.GetAListOfCurrentUsersPlaylistsAsync(offset: offset, limit: PlaylistLimit);
            userPlaylists.AddRange(response.Items);

            offset = response.Next is not null ? response.Offset + response.Limit : -1;
        } while (offset != -1);

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

        var remainingTracks = await GetRemainingPlaylistTracks(playlistId, userMarket, playlist.Tracks);
        playlist.Tracks.Items = playlist.Tracks.Items.Concat(remainingTracks).ToList();

        return playlist.Adapt<Playlist>();
    }

    public async Task<List<Track>> GetPlaylistTracks(string playlistId, string userMarket)
    {
        var playlistWithTracks = await GetPlaylistWithTracks(playlistId, userMarket);

        return playlistWithTracks?.Tracks ?? new List<Track>();
    }
    // todo: delete this stuff below
    //     var spotifyTracks = new List<PlaylistTrackObject>();
    //     var offset = 0;
    //     
    //     var firstBatch = await _spotifyClient.GetPlaylistsTracksAsync(playlistId, offset: offset,
    //         limit: PlaylistTracksLimit,
    //         market: userMarket);
    //
    //     // do
    //     // {
    //     //     var response = await _spotifyClient.GetPlaylistsTracksAsync(playlistId, offset: offset,
    //     //         limit: PlaylistTracksLimit,
    //     //         market: userMarket);
    //     //     spotifyTracks.AddRange(response.Items);
    //     //
    //     //     offset = response.Next is not null ? response.Offset + response.Limit : -1;
    //     // } while (offset != -1);
    //
    //     return spotifyTracks.Adapt<List<Track>>();
    // }

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

    // Fetch remaining tracks, 2 requests at the same time
    private async Task<List<PlaylistTrackObject>> GetRemainingPlaylistTracks(string playlistId, string userMarket,
        PlaylistTracksPagingObject pagingObject)
    {
        var spotifyTracks = new List<PlaylistTrackObject>();
        var nextOffset = pagingObject.Offset + pagingObject.Limit;

        for (var i = nextOffset; i < pagingObject.Total; i = i + (2 * pagingObject.Limit))
        {
            var firstRequestOffset = i;
            var secondRequestOffset = i + pagingObject.Limit;

            var firstRequest = _spotifyClient.GetPlaylistsTracksAsync(playlistId, market: userMarket,
                offset: firstRequestOffset, limit: PlaylistTracksLimit);

            // If there is only one request left, skip the second one
            if (secondRequestOffset >= pagingObject.Total)
            {
                spotifyTracks.AddRange((await firstRequest).Items);
            }
            else
            {
                var secondRequest = _spotifyClient.GetPlaylistsTracksAsync(playlistId, market: userMarket,
                    offset: secondRequestOffset, limit: PlaylistTracksLimit);

                var (firstResponse, secondResponse) = (await firstRequest, await secondRequest);

                spotifyTracks.AddRange(firstResponse.Items);
                spotifyTracks.AddRange(secondResponse.Items);
            }
        }

        return spotifyTracks;
    }
}
