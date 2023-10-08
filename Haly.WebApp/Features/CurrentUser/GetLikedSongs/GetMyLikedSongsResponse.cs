namespace Haly.WebApp.Features.CurrentUser.GetLikedSongs;

public record GetMyLikedSongsResponse(IDictionary<string, string> LikedSongIdByPlaybackId);
