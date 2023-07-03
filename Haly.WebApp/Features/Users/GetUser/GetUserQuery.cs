using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Users.GetUser;

public record GetUserQuery(string Id) : IRequest<PublicUserDto?>;

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, PublicUserDto?>
{
    private readonly ISpotifyService _spotifyService;

    public GetUserQueryHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<PublicUserDto?> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _spotifyService.GetUser(request.Id);

        return user?.Adapt<PublicUserDto>();
    }
}
