using Haly.WebApp.Models;
using Haly.WebApp.Models.Cards;
using Haly.WebApp.Models.Search;
using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public interface ISpotifyService
{
    Task<PublicUser?> GetUser(string id);
    Task<PrivateUser> GetCurrentUser();
    Task<List<Playlist>> GetUserPlaylists(string userId);
    Task<CurrentUserPlaylistsDto> GetCurrentUserPlaylists();
    Task<Playlist?> GetPlaylistWithTracks(string playlistId, string userMarket);
    Task<List<PlaylistTrack>> GetPlaylistTracks(string playlistId, string userMarket);
    Task<LikedSongsDto?> GetLikedSongsIfChanged(string userMarket, string? prevSnapshotId);
    Task<List<Device>> GetAvailableDevices();
    Task<bool> IsCurrentUserFollowing(CreatorType creatorType, string creatorId);
    Task<List<FollowedArtist>> GetCurrentUserFollows();
    Task<List<TopArtist>> GetCurrentUserTopArtists();
    Task<List<TrackBase>> GetCurrentUserTopTracks();
    Task<ArtistDetailed> GetArtist(string artistId, string userMarket);
    Task<List<ReleaseItem>> GetArtistReleases(string artistId, ArtistRelease type, string userMarket);
    Task<AlbumDetailed> GetAlbum(string albumId, string userMarket);
    Task<SpotifySearchResult> Search(string query, SearchType type, string userMarket);
    Task<List<RecommendedTrack>> GetRecommendations(string userMarket, string? trackIds, string? artistIds);
    Task<List<Track>> GetQueue();
    Task<List<Track>> GetRecentlyPlayedTracks();

    Task FollowCreator(CreatorType creatorType, string creatorId);
    Task UnfollowCreator(CreatorType creatorType, string creatorId);
    Task FollowPlaylist(string id);
    Task UnfollowPlaylist(string id);
    Task FollowTracks(string ids);
    Task UnfollowTracks(string ids);

}

public record CurrentUserPlaylistsDto(List<Playlist> Playlists, List<string> PlaylistOrder);

public record LikedSongsDto(string SnapshotId, List<PlaylistTrack> Tracks);
