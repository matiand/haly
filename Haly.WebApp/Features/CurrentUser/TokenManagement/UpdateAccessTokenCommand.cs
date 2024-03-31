using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.TokenManagement;

public record UpdateAccessTokenCommand(string Token) : IRequest<PrivateUser>;

public class UpdateAccessTokenHandler(CurrentUserStore meStore, IHttpClientFactory httpClientFactory)
    : IRequestHandler<UpdateAccessTokenCommand, PrivateUser>
{
    public async Task<PrivateUser> Handle(UpdateAccessTokenCommand request, CancellationToken cancellationToken)
    {
        var innerClient = httpClientFactory.CreateClient();
        innerClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", request.Token);
        var spotifyClient = new GeneratedSpotifyClient(innerClient);

        var user = await spotifyClient.GetCurrentUsersProfileAsync(cancellationToken);
        meStore.Update(request.Token, user.Adapt<PrivateUser>());

        return user.Adapt<PrivateUser>();
    }
}
