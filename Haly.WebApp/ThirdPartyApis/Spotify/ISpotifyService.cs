using Haly.WebApp.Models;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public interface ISpotifyService
{
    Task<User> GetCurrentUser();
    Task<List<Playlist>> GetCurrentUserPlaylists();
    Task<List<Track>> GetPlaylistTracks(string playlistId, string userMarket);
    Task<List<Track>> GetLikedSongs(string userMarket);
}