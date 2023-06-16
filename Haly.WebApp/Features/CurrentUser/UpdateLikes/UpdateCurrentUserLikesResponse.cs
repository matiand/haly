using Haly.WebApp.Features.Playlists;

namespace Haly.WebApp.Features.CurrentUser.UpdateLikes;

public record UpdateCurrentUserLikesResponse(bool Created, PlaylistBriefDto Playlist);
