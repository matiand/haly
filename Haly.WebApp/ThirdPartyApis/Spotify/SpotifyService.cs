using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;
using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Playlists.RemoveTracks;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Cards;
using Haly.WebApp.Models.Search;
using Haly.WebApp.Models.Tracks;
using Mapster;
using Track = Haly.WebApp.Models.Tracks.Track;
using Type = Haly.GeneratedClients.Type;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public sealed class SpotifyService : ISpotifyService
{
    private readonly GeneratedSpotifyClient _spotifyClient;
    private readonly ISpotifyEndpointCollector _endpointCollector;

    private const int PlaylistLimit = 50;

    // Their docs say that GET PlaylistTracks endpoint has a limit of 50, but actually it's 100
    private const int PlaylistTracksLimit = 100;
    private const int AlbumTracksLimit = 50;
    private const int LikedSongsLimit = 50;
    private const int UserFollowsLimit = 50;
    private const int UserTopItemsLimit = 10;
    private const int ArtistReleasesLimit = 50;
    private const int RecommendationsLimit = 100;
    private const int RecentlyPlayedTracksLimit = 50;
    private const int FollowingTracksLimit = 50;
    private const int AddingTracksLimit = 100;
    private const int RemovingTracksLimit = 100;

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

        playlist.Tracks.Items = playlist.Tracks.Items
            .Concat(remainingTracks)
            .Where(t => t.Track is not null)
            .ToList();

        var playlistDto = playlist.Adapt<Playlist>();
        playlistDto.Tracks = playlistDto.Tracks.AnnotateWithPosition();

        return playlistDto;
    }

    public async Task<List<PlaylistTrack>> GetPlaylistTracks(string playlistId, string userMarket)
    {
        var tracksDto = await _endpointCollector.FetchConcurrently(
            endpointFn: (limit, offset) =>
                _spotifyClient.GetPlaylistsTracksAsync(playlistId, userMarket, limit: limit, offset: offset),
            dataFn: pagingObj => pagingObj.Items,
            endpointLimit: PlaylistTracksLimit, maxConcurrentRequests: 4);

        return tracksDto
            .Where(t => t.Track is not null)
            .Adapt<List<PlaylistTrack>>()
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
            .Adapt<List<PlaylistTrack>>()
            .AnnotateWithPosition();

        return new LikedSongsDto(currSnapshot.SnapshotId, songsDto);
    }

    public async Task<List<Device>> GetAvailableDevices()
    {
        var response = await _spotifyClient.GetAUsersAvailableDevicesAsync();
        return response.Devices.Adapt<List<Device>>();
    }

    public async Task<bool> IsCurrentUserFollowingCreator(CreatorType creatorType, string creatorId)
    {
        var type = creatorType is CreatorType.Artist ? Type4.Artist : Type4.User;
        var response = await _spotifyClient.CheckCurrentUserFollowsAsync(type, creatorId);

        return response.First();
    }

    public async Task<bool> IsCurrentUserFollowingAnAlbum(string albumId)
    {
        var response = await _spotifyClient.CheckUsersSavedAlbumsAsync(albumId);

        return response.First();
    }

    public async Task<List<FollowedArtist>> GetCurrentUserFollows()
    {
        var response = await _spotifyClient.GetFollowedAsync(Type.Artist, limit: UserFollowsLimit);
        var follows = new List<ArtistObject>(response.Artists.Items);

        while (response.Artists.Next is not null)
        {
            follows.AddRange(response.Artists.Items);

            response = await _spotifyClient.GetFollowedAsync(Type.Artist, limit: UserFollowsLimit,
                after: response.Artists.Cursors.After);
        }

        return follows.Adapt<List<FollowedArtist>>();
    }

    public async Task<List<TopArtist>> GetCurrentUserTopArtists()
    {
        var artists = await _spotifyClient.GetUsersTopArtistsAsync("short_term", limit: UserTopItemsLimit);

        return artists.Items.Adapt<List<TopArtist>>();
    }

    public async Task<List<TrackBase>> GetCurrentUserTopTracks()
    {
        var tracks = await _spotifyClient.GetUsersTopTracksAsync("short_term", limit: UserTopItemsLimit);

        return tracks.Items.Adapt<List<TrackBase>>();
    }

    public async Task<ArtistDetailed> GetArtist(string artistId, string userMarket)
    {
        var artistTask = _spotifyClient.GetAnArtistAsync(artistId);
        var topItemsTask = _spotifyClient.GetAnArtistsTopTracksAsync(artistId, userMarket);

        var (artist, topItems) = (await artistTask, await topItemsTask);
        var dto = artist.Adapt<ArtistDetailed>();
        dto.TopTracks = topItems.Tracks.Adapt<List<Track>>();

        return dto;
    }

    public async Task<List<ReleaseItem>> GetArtistReleases(string artistId, ArtistRelease type, string userMarket)
    {
        if (type == ArtistRelease.AppearsOn)
        {
            // For appearances we only fetch first 100 items, because we are mostly interested in
            // albums and singles that the artists contributed to. Most of these show up in the
            // first 100 results. The rest are generic compilations with artist's popular songs.
            // Those don't bring much value.
            var firstResponse =
                _spotifyClient.GetAnArtistsAlbumsAsync(artistId, type.Value, userMarket, ArtistReleasesLimit);
            var secondResponse =
                _spotifyClient.GetAnArtistsAlbumsAsync(artistId, type.Value, userMarket, ArtistReleasesLimit,
                    offset: ArtistReleasesLimit);

            var (firstBatch, secondBatch) = (await firstResponse, await secondResponse);
            var items = firstBatch.Items.Concat(secondBatch.Items);

            return items.Adapt<List<ReleaseItem>>();
        }
        else
        {
            var items = await _endpointCollector.FetchConcurrently(
                endpointFn: (limit, offset) =>
                    _spotifyClient.GetAnArtistsAlbumsAsync(artistId, type.Value, userMarket, limit, offset),
                dataFn: pagingObj => pagingObj.Items,
                endpointLimit: ArtistReleasesLimit, maxConcurrentRequests: 2);

            return items.Adapt<List<ReleaseItem>>();
        }
    }

    public async Task<AlbumDetailed> GetAlbum(string albumId, string userMarket)
    {
        var album = await _spotifyClient.GetAnAlbumAsync(albumId, userMarket);
        var tracks = new List<SimplifiedTrackObject>(album.Tracks.Items);

        if (album.Tracks.Next is not null)
        {
            var remainingTracks = await _endpointCollector.FetchConcurrently(
                endpointFn: (limit, offset) =>
                    _spotifyClient.GetAnAlbumsTracksAsync(albumId, userMarket, limit, offset),
                dataFn: pagingObj => pagingObj.Items,
                startingOffset: album.Tracks.Limit, endpointLimit: AlbumTracksLimit, maxConcurrentRequests: 2
            );

            tracks.AddRange(remainingTracks);
        }

        var albumDto = album.Adapt<AlbumDetailed>();
        albumDto.Tracks = tracks.Adapt<List<AlbumTrack>>();

        return albumDto;
    }

    public async Task<SpotifySearchResult> Search(string query, SearchType type, string userMarket)
    {
        var queryType = type switch
        {
            SearchType.Album => Anonymous.Album,
            SearchType.Artist => Anonymous.Artist,
            SearchType.Playlist => Anonymous.Playlist,
            SearchType.Track => Anonymous.Track,
            _ => throw new ArgumentOutOfRangeException(nameof(type), type, "Wrong search type"),
        };
        var results = await _spotifyClient.SearchAsync(query, new List<Anonymous> { queryType }, userMarket);

        return results.Adapt<SpotifySearchResult>();
    }

    public async Task<List<RecommendedTrack>> GetRecommendations(string userMarket, string? trackIds, string? artistIds)
    {
        if (!string.IsNullOrEmpty(trackIds))
        {
            var response =
                await _spotifyClient.GetRecommendationsAsync(RecommendationsLimit, userMarket, seed_tracks: trackIds);
            return response.Tracks.Adapt<List<RecommendedTrack>>();
        }

        if (!string.IsNullOrEmpty(artistIds))
        {
            var response =
                await _spotifyClient.GetRecommendationsAsync(RecommendationsLimit, userMarket, seed_artists: artistIds);
            return response.Tracks.Adapt<List<RecommendedTrack>>();
        }

        return new List<RecommendedTrack>();
    }

    public async Task<List<Track>> GetQueue()
    {
        var response = await _spotifyClient.GetQueueAsync();

        if (response.Currently_playing is null) return new();

        var queue = new List<Track> { response.Currently_playing.Adapt<Track>() };
        queue.AddRange(response.Queue.Adapt<List<Track>>());

        // We need to fix IsPlayable, because this response doesn't provide that information.
        queue.ForEach(t => t.IsPlayable = true);

        // Only return Songs, we do not support Podcasts
        return queue.Where(t => t.IsSong).ToList();
    }

    public async Task<List<Track>> GetRecentlyPlayedTracks()
    {
        // Please be aware that this response may not always be perfect. Occasionally, it may
        // include tracks currently in play, or miss out on partially played tracks and podcasts. We
        // provide the best results we can, but some nuances might be overlooked.
        var response = await _spotifyClient.GetRecentlyPlayedAsync(limit: RecentlyPlayedTracksLimit);
        var tracks = response.Items.Select(i => i.Track).Adapt<List<Track>>();

        // We need to fix IsPlayable, because this response doesn't provide that information.
        tracks.ForEach(t => t.IsPlayable = true);

        // Only return Songs, we do not support Podcasts
        return tracks.Where(t => t.IsSong).ToList();
    }

    public Task FollowCreator(CreatorType creatorType, string creatorId)
    {
        var type = creatorType is CreatorType.Artist ? Type2.Artist : Type2.User;
        return _spotifyClient.FollowArtistsUsersAsync(type, creatorId);
    }

    public Task UnfollowCreator(CreatorType creatorType, string creatorId)
    {
        var type = creatorType is CreatorType.Artist ? Type3.Artist : Type3.User;
        return _spotifyClient.UnfollowArtistsUsersAsync(type, creatorId);
    }

    public Task FollowAlbum(string id)
    {
        return _spotifyClient.SaveAlbumsUserAsync(id);
    }

    public Task UnfollowAlbum(string id)
    {
        return _spotifyClient.RemoveAlbumsUserAsync(id);
    }

    public Task FollowPlaylist(string id)
    {
        return _spotifyClient.FollowPlaylistAsync(id);
    }

    public Task UnfollowPlaylist(string id)
    {
        return _spotifyClient.UnfollowPlaylistAsync(id);
    }

    public async Task FollowTracks(IReadOnlyCollection<string> ids)
    {
        var limit = FollowingTracksLimit;
        for (var i = 0; i < ids.Count; i += limit)
        {
            var idsBatch = ids.Skip(i).Take(limit).ToList();
            await _spotifyClient.SaveTracksUserAsync(ids: null!, body: new()
            {
                Ids = idsBatch,
            });
        }
    }

    public async Task UnfollowTracks(IReadOnlyCollection<string> ids)
    {
        var limit = FollowingTracksLimit;
        for (var i = 0; i < ids.Count; i += limit)
        {
            var idsBatch = ids.Skip(i).Take(limit).ToList();
            await _spotifyClient.RemoveTracksUserAsync(ids: null!, body: new()
            {
                Ids = idsBatch,
            });
        }
    }

    public async Task<Playlist> CreatePlaylist(string userId, string name)
    {
        var response = await _spotifyClient.CreatePlaylistAsync(userId, body: new() { Name = name });
        return response.Adapt<Playlist>();
    }

    public Task UpdatePlaylistDetails(string playlistId, string name, string description)
    {
        if (string.IsNullOrWhiteSpace(description))
        {
            return _spotifyClient.ChangePlaylistDetailsAsync(playlistId, body: new() { Name = name });
        }

        return _spotifyClient.ChangePlaylistDetailsAsync(playlistId,
            body: new() { Name = name, Description = description });
    }

    public async Task AddTracks(string playlistId, IReadOnlyCollection<string> trackUris)
    {
        // Their documentation says that AddTracksToPlaylistAsync will append tracks by default, but
        // they actually prepend them. To fix this issue we check how many tracks there are in total and use it to
        // calculate the position.
        var playlistResponse = await _spotifyClient.GetPlaylistAsync(playlistId);
        var positionOffset = playlistResponse.Tracks.Total;

        var limit = AddingTracksLimit;
        for (var i = 0; i < trackUris.Count; i += limit)
        {
            var urisBatch = trackUris.Skip(i).Take(limit).ToList();

            await _spotifyClient.AddTracksToPlaylistAsync(playlistId, body: new()
            {
                Uris = urisBatch,
                Position = positionOffset + i,
            });
        }
    }

    public async Task RemoveTracks(string playlistId, IReadOnlyCollection<RemoveTrackDto> tracks)
    {
        var limit = RemovingTracksLimit;
        for (var i = 0; i < tracks.Count; i += limit)
        {
            var batch = tracks.Skip(i)
                .Take(limit)
                .Select(dto => new Tracks2() { Uri = dto.Uri, Positions = dto.Positions })
                .ToList();

            await _spotifyClient.RemoveTracksPlaylistAsync(playlistId, body: new()
            {
                Tracks = batch,
            });
        }
    }
}
