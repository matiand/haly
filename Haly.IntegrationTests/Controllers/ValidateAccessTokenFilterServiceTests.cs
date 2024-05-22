using System.Net;
using System.Net.Http.Json;
using System.Text.RegularExpressions;
using FluentAssertions;
using Haly.WebApp.Features.ErrorHandling;
using NSubstitute;
using NSubstitute.ReturnsExtensions;

namespace Haly.IntegrationTests.Controllers;

public class ValidateAccessTokenFilterServiceTests(HalyApiFactory apiFactory) : IClassFixture<HalyApiFactory>
{
    [Fact]
    public async Task Filter_Returns401UnauthorizedForProtectedEndpoints_WhenAccessTokenIsMissing()
    {
        var client = apiFactory.CreateClient();

        var response = await client.GetAsync("Users/foo");
        var problem = await response.Content.ReadFromJsonAsync<Problem>();

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        problem!.Title.Should().MatchRegex(new Regex("missing.*token", RegexOptions.IgnoreCase));
    }

    [Fact]
    public async Task Allows_CallingProtectedEndpoints_WhenUserIsAuthenticated()
    {
        var user = ModelFactory.Me.Generate();
        var client = apiFactory
            .AuthenticateWith(user)
            .MockSpotifyService(spotify => { spotify.GetUser(Arg.Any<string>()).ReturnsNull(); })
            .CreateClient();

        var response = await client.GetAsync("Users/foo");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
