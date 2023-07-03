using Haly.WebApp.Features.Playlists;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Users.GetUserPlaylists;

public record GetUserPlaylistsQuery(string UserId) : IRequest<IEnumerable<PlaylistBriefDto>>;

public class GetUserPlaylistsQueryHandler : IRequestHandler<GetUserPlaylistsQuery, IEnumerable<PlaylistBriefDto>>
{
    private readonly ISpotifyService _spotifyService;

    public GetUserPlaylistsQueryHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<IEnumerable<PlaylistBriefDto>> Handle(GetUserPlaylistsQuery request,
        CancellationToken cancellationToken)
    {
        var playlists = await _spotifyService.GetUserPlaylists(request.UserId);

        return playlists.Adapt<IEnumerable<PlaylistBriefDto>>();
    }
}
