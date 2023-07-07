using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Features.Artists.GetArtist;
using Haly.WebApp.Features.CurrentUser.GetFollowedArtists;
using Haly.WebApp.Features.CurrentUser.GetTopArtists;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;
using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Models;
using Mapster;
using Track = Haly.WebApp.Models.Track;
using Type = Haly.GeneratedClients.Type;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public sealed class SpotifyService : ISpotifyService
{
    private readonly GeneratedSpotifyClient _spotifyClient;
    private readonly ISpotifyEndpointCollector _endpointCollector;

    private const int PlaylistLimit = 50;

    // Their docs say that GET PlaylistTracks endpoint has a limit of 50, but actually it's 100
    private const int PlaylistTracksLimit = 100;
    private const int LikedSongsLimit = 50;
    private const int UserFollowsLimit = 50;
    private const int UserTopArtistsLimit = 10;

    public SpotifyService(HttpClient httpClient, CurrentUserStore currentUserStore,
        ISpotifyEndpointCollector endpointCollector)
    {
        httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", currentUserStore.Token);

        _spotifyClient = new GeneratedSpotifyClient(httpClient, throwDeserializationErrors: false);
        _endpointCollector = endpointCollector;
    }

    public async Task<PublicUser?> GetUser(string id)
    {
        var spotifyUser = await _spotifyClient.GetUsersProfileAsync(id);
        return spotifyUser.Adapt<PublicUser>();
    }

    public async Task<PrivateUser> GetCurrentUser()
    {
        var spotifyUser = await _spotifyClient.GetCurrentUsersProfileAsync();
        return spotifyUser.Adapt<PrivateUser>();
    }

    public async Task<List<Playlist>> GetUserPlaylists(string userId)
    {
        // We only fetch first 50 playlists, maybe in future we'll add pagination
        var playlists = await _spotifyClient.GetListUsersPlaylistsAsync(userId, PlaylistLimit, offset: 0);

        return playlists.Items.Adapt<List<Playlist>>();
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

    public async Task<LikedSongsDto?> GetLikedSongsIfChanged(string userMarket, string? prevSnapshotId)
    {
        var response =
            await _spotifyClient.GetUsersSavedTracksAsync(offset: 0, limit: LikedSongsLimit, market: userMarket);

        var currSnapshot = response.Adapt<LikedSongsSnapshot>();
        if (currSnapshot.Equals(prevSnapshotId)) return null;

        var remainingSongs = await _endpointCollector.FetchConcurrently(
            endpointFn: (limit, offset) =>
                _spotifyClient.GetUsersSavedTracksAsync(userMarket, limit: limit, offset: offset),
            dataFn: pagingObj => pagingObj.Items,
            endpointLimit: LikedSongsLimit, maxConcurrentRequests: 4, startingOffset: response.Limit);

        var songsDto = response.Items
            .Concat(remainingSongs)
            .Adapt<List<Track>>()
            .AnnotateWithPosition();

        return new LikedSongsDto(currSnapshot.SnapshotId, songsDto);
    }

    public async Task<List<DeviceDto>> GetAvailableDevices()
    {
        var response = await _spotifyClient.GetAUsersAvailableDevicesAsync();
        return response.Devices.Adapt<List<DeviceDto>>();
    }

    public async Task<bool> IsCurrentUserFollowing(CreatorType creatorType, string creatorId)
    {
        var type = creatorType is CreatorType.Artist ? Type4.Artist : Type4.User;
        var response = await _spotifyClient.CheckCurrentUserFollowsAsync(type, creatorId);

        return response.First();
    }

    public async Task Follow(CreatorType creatorType, string creatorId)
    {
        var type = creatorType is CreatorType.Artist ? Type2.Artist : Type2.User;
        await _spotifyClient.FollowArtistsUsersAsync(type, creatorId);
    }

    public async Task Unfollow(CreatorType creatorType, string creatorId)
    {
        var type = creatorType is CreatorType.Artist ? Type3.Artist : Type3.User;
        await _spotifyClient.UnfollowArtistsUsersAsync(type, creatorId);
    }

    public async Task<List<FollowedArtistDto>> GetCurrentUserFollows()
    {
        var response = await _spotifyClient.GetFollowedAsync(Type.Artist, limit: UserFollowsLimit);
        var follows = new List<ArtistObject>(response.Artists.Items);

        while (response.Artists.Next is not null)
        {
            follows.AddRange(response.Artists.Items);

            response = await _spotifyClient.GetFollowedAsync(Type.Artist, limit: UserFollowsLimit,
                after: response.Artists.Cursors.After);
        }

        return follows.Adapt<List<FollowedArtistDto>>();
    }

    public async Task<List<TopArtistDto>> GetCurrentUserTopArtists()
    {
        var artists = await _spotifyClient.GetUsersTopArtistsAsync("short_term", limit: UserTopArtistsLimit);

        return artists.Items.Adapt<List<TopArtistDto>>();
    }

    public async Task<ArtistDetailsDto> GetArtist(string artistId)
    {
        var artist = await _spotifyClient.GetAnArtistAsync(artistId);

        return artist.Adapt<ArtistDetailsDto>();
    }
}
