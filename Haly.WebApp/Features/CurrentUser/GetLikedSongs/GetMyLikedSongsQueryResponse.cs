namespace Haly.WebApp.Features.CurrentUser.GetLikedSongs;

public record GetMyLikedSongsQueryResponse(IDictionary<string, string> LikedSongIdByPlaybackId);
