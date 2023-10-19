using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Users.GetUser;

public record GetUserQuery(string Id) : IRequest<UserProfileDto?>;

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserProfileDto?>
{
    private readonly ISpotifyService _spotifyService;

    public GetUserQueryHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<UserProfileDto?> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _spotifyService.GetUser(request.Id);
        if (user is null) return null;

        var dto = user.Adapt<UserProfileDto>();
        dto.IsFollowed = await _spotifyService.IsCurrentUserFollowingCreator(CreatorType.User, creatorId: user.Id);

        return dto;
    }
}
