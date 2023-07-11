using Haly.WebApp.Features.Artists.GetArtist;
using Haly.WebApp.Features.CurrentUser.GetFollowedArtists;
using Haly.WebApp.Features.CurrentUser.GetTopArtists;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Models;

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
    Task<List<DeviceDto>> GetAvailableDevices();
    Task<bool> IsCurrentUserFollowing(CreatorType creatorType, string creatorId);
    Task Follow(CreatorType creatorType, string creatorId);
    Task Unfollow(CreatorType creatorType, string creatorId);
    Task<List<FollowedArtistDto>> GetCurrentUserFollows();
    Task<List<TopArtistDto>> GetCurrentUserTopArtists();
    Task<ArtistDetailsDto> GetArtist(string artistId);
    Task<AlbumDetailed> GetAlbum(string albumId, string userMarket);
}

public record CurrentUserPlaylistsDto(List<Playlist> Playlists, List<string> PlaylistOrder);

public record LikedSongsDto(string SnapshotId, List<PlaylistTrack> Tracks);
