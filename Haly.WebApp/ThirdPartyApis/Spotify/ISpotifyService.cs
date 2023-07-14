using Haly.WebApp.Models;
using Haly.WebApp.Models.Cards;
using Haly.WebApp.Models.Search;

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
    Task Follow(CreatorType creatorType, string creatorId);
    Task Unfollow(CreatorType creatorType, string creatorId);
    Task<List<FollowedArtist>> GetCurrentUserFollows();
    Task<List<TopArtist>> GetCurrentUserTopArtists();
    Task<ArtistDetailed> GetArtist(string artistId, string userMarket);
    Task<AlbumDetailed> GetAlbum(string albumId, string userMarket);

    Task<SpotifySearchResult> Search(string query, SearchType type, string userMarket);
}

public record CurrentUserPlaylistsDto(List<Playlist> Playlists, List<string> PlaylistOrder);

public record LikedSongsDto(string SnapshotId, List<PlaylistTrack> Tracks);
