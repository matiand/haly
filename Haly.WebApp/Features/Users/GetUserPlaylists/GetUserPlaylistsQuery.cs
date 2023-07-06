using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Users.GetUserPlaylists;

public record GetUserPlaylistsQuery(string UserId) : IRequest<IEnumerable<PlaylistCardDto>>;

public class GetUserPlaylistsQueryHandler : IRequestHandler<GetUserPlaylistsQuery, IEnumerable<PlaylistCardDto>>
{
    private readonly ISpotifyService _spotifyService;

    public GetUserPlaylistsQueryHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<IEnumerable<PlaylistCardDto>> Handle(GetUserPlaylistsQuery request,
        CancellationToken cancellationToken)
    {
        var playlists = await _spotifyService.GetUserPlaylists(request.UserId);

        return playlists.Adapt<IEnumerable<PlaylistCardDto>>();
    }
}
