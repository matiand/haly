using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Models;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public interface ISpotifyService
{
    Task<User> GetCurrentUser();
    Task<CurrentUserPlaylistsDto> GetCurrentUserPlaylists();
    Task<Playlist?> GetPlaylistWithTracks(string playlistId, string userMarket);
    Task<List<Track>> GetPlaylistTracks(string playlistId, string userMarket);
    Task<LikedSongsDto?> GetLikedSongsIfChanged(string userMarket, string? prevSnapshotId);
    Task<List<DeviceDto>> GetAvailableDevices();
}

public record CurrentUserPlaylistsDto(List<Playlist> Playlists, List<string> PlaylistOrder);

public record LikedSongsDto(string SnapshotId, List<Track> Tracks);
