using System.Net.Http.Headers;
using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.TokenManagement;

public record UpdateAccessTokenCommand(string Token) : IRequest<User>;

public class UpdateAccessTokenHandler : IRequestHandler<UpdateAccessTokenCommand, User>
{
    private readonly CurrentUserStore _currentUserStore;
    private readonly IHttpClientFactory _httpClientFactory;

    public UpdateAccessTokenHandler(CurrentUserStore currentUserStore, IHttpClientFactory httpClientFactory)
    {
        _currentUserStore = currentUserStore;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<User> Handle(UpdateAccessTokenCommand request, CancellationToken cancellationToken)
    {
        var innerClient = _httpClientFactory.CreateClient();
        innerClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", request.Token);
        var spotifyClient = new GeneratedSpotifyClient(innerClient);

        var user = await spotifyClient.GetCurrentUsersProfileAsync(cancellationToken);
        _currentUserStore.Update(request.Token, user.Adapt<UserDto>());

        return user.Adapt<User>();
    }
}
