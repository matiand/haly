namespace Haly.WebApp.Features.CurrentUser.GetLikedSongs;

public record GetMyLikedSongsQueryResponse(string CollectionId, IDictionary<string, string> LikedSongIdByPlaybackId);
