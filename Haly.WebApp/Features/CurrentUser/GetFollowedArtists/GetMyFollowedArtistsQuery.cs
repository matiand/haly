using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.GetFollowedArtists;

public record GetMyFollowedArtistsQuery : IRequest<IEnumerable<FollowedArtistDto>>;

public class GetMyFollowedArtistsHandler(ISpotifyService spotifyService)
    : IRequestHandler<GetMyFollowedArtistsQuery, IEnumerable<FollowedArtistDto>>
{
    public async Task<IEnumerable<FollowedArtistDto>> Handle(GetMyFollowedArtistsQuery request,
        CancellationToken cancellationToken)
    {
        var followedArtists = await spotifyService.GetCurrentUserFollows();

        return followedArtists.Adapt<IEnumerable<FollowedArtistDto>>();
    }
}
