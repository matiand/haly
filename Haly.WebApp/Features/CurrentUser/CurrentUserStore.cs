using System.Net.Http.Headers;
using Haly.GeneratedClients;

namespace Haly.WebApp.Features.CurrentUser;

public class CurrentUserStore
{
    private readonly IHttpClientFactory _httpClientFactory;

    public CurrentUserStore(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public string? UserId { get; private set; }
    public string? Token { get; private set; }
    public string? Market { get; private set; }

    public bool IsEmpty => string.IsNullOrEmpty(UserId) || string.IsNullOrEmpty(Token);

    public async Task Update(string token)
    {
        // We need to fetch current user for their UserId
        var innerClient = _httpClientFactory.CreateClient();
        innerClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        var spotifyClient = new GeneratedSpotifyClient(innerClient);

        var user = await spotifyClient.GetCurrentUsersProfileAsync();
        UserId = user.Id;
        Token = token;
        Market = user.Country;
    }
}
