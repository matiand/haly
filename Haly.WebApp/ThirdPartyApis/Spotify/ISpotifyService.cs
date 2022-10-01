using Haly.WebApp.Features.Player;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Models;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public interface ISpotifyService
{
    Task<User> GetCurrentUser();
    Task<List<Playlist>> GetCurrentUserPlaylists();

    // Spotify documentation states that when you omit 'userMarket', the market
    // associated with user account that requests data will be used (based on
    // access token). From testing this seems not true, so when you need data
    // for your market, set 'userMarket' explicitly.
    Task<List<Track>> GetPlaylistTracks(string playlistId, string userMarket);
    Task<List<Track>> GetLikedSongs(string userMarket);
    Task<List<DeviceDto>> GetAvailableDevices();
}
