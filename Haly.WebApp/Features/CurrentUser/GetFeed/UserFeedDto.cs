using Haly.WebApp.Features.Artists;
using Haly.WebApp.Features.Users.GetUserPlaylists;

namespace Haly.WebApp.Features.CurrentUser.GetFeed;

public record UserFeedDto
{
    public IEnumerable<PlaylistCardDto> Playlists { get; set; }

    public IDictionary<string, IEnumerable<ReleaseItemDto>> AlbumsByCategory { get; set; } =
        new Dictionary<string, IEnumerable<ReleaseItemDto>>();
}
