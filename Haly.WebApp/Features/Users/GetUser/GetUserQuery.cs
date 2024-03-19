using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Users.GetUser;

public record GetUserQuery(string Id) : IRequest<UserProfileDto?>;

public class GetUserQueryHandler(ISpotifyService spotifyService) : IRequestHandler<GetUserQuery, UserProfileDto?>
{
    public async Task<UserProfileDto?> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await spotifyService.GetUser(request.Id);
        if (user is null) return null;

        var dto = user.Adapt<UserProfileDto>();
        dto.IsFollowed = await spotifyService.IsCurrentUserFollowingCreator(CreatorType.User, creatorId: user.Id);

        return dto;
    }
}
