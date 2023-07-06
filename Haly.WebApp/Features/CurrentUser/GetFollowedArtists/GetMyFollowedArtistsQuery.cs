using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.GetFollowedArtists;

public record GetMyFollowedArtistsQuery : IRequest<IEnumerable<FollowedArtistDto>>;

public class GetMyFollowedArtistsHandler
    : IRequestHandler<GetMyFollowedArtistsQuery, IEnumerable<FollowedArtistDto>>
{
    private readonly ISpotifyService _spotifyService;

    public GetMyFollowedArtistsHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<IEnumerable<FollowedArtistDto>> Handle(GetMyFollowedArtistsQuery request,
        CancellationToken cancellationToken)
    {
        var followedArtists = await _spotifyService.GetCurrentUserFollows();

        return followedArtists.Adapt<IEnumerable<FollowedArtistDto>>();
    }
}
