using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Haly.GeneratedClients;
using Haly.WebApp.Features.ErrorHandling;
using Microsoft.AspNetCore.Http;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using NSubstitute.ReturnsExtensions;

namespace Haly.IntegrationTests.Controllers;

public class ApiExceptionFilterTests(HalyApiFactory apiFactory) : IClassFixture<HalyApiFactory>
{
    [Fact]
    public async Task Filter_ReturnsAProblemResponse_WhenEndpointThrowsAnException()
    {
        var user = ModelFactory.Me.Generate();
        var tooManyRequestsException = new ApiException("",
            StatusCodes.Status429TooManyRequests,
            null!,
            new Dictionary<string,
            IEnumerable<string>>(),
            null!);

        var client = apiFactory
            .AuthenticateWith(user)
            .MockSpotifyService(spotify => { spotify.GetUser(Arg.Any<string>()).ThrowsAsync(tooManyRequestsException); })
            .CreateClient();

        var response = await client.GetAsync("/Users/foo");
        var problem = await response.Content.ReadFromJsonAsync<Problem>();

        response.StatusCode.Should().Be(HttpStatusCode.TooManyRequests);
        problem.Should().BeOfType<Problem>();
    }

    [Fact]
    public async Task Filter_ReturnsA404Problem_WhenResourceIsNotFound()
    {
        var user = ModelFactory.Me.Generate();
        var client = apiFactory
            .AuthenticateWith(user)
            .MockSpotifyService(spotify => { spotify.GetUser(Arg.Any<string>()).ReturnsNull(); })
            .CreateClient();

        var response = await client.GetAsync("/Users/foo");
        var problem = await response.Content.ReadFromJsonAsync<Problem>();

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        problem.Should().BeOfType<Problem>();
    }
}
