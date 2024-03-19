using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Users.GetUserPlaylists;

public record GetUserPlaylistsQuery(string UserId) : IRequest<IEnumerable<PlaylistCardDto>>;

public class GetUserPlaylistsQueryHandler(ISpotifyService spotifyService)
    : IRequestHandler<GetUserPlaylistsQuery, IEnumerable<PlaylistCardDto>>
{
    public async Task<IEnumerable<PlaylistCardDto>> Handle(GetUserPlaylistsQuery request,
        CancellationToken cancellationToken)
    {
        var playlists = await spotifyService.GetUserPlaylists(request.UserId);

        return playlists.Adapt<IEnumerable<PlaylistCardDto>>();
    }
}
