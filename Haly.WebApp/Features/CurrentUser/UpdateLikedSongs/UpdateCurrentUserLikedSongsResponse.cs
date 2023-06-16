using Haly.WebApp.Features.Playlists;

namespace Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;

public record UpdateCurrentUserLikedSongsResponse(bool Created, PlaylistBriefDto Playlist);
