using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Users.GetUser;
using Mapster;
using NSubstitute;

namespace Haly.IntegrationTests.Controllers.MeController;

public class GetUserTests(HalyApiFactory apiFactory) : IClassFixture<HalyApiFactory>
{
    [Fact]
    public async Task GetUser_Returns200Ok_WhenUserIsFound()
    {
        // Arrange
        var user = ModelFactory.PublicUser.Generate();

        var httpClient = apiFactory
            .AuthenticateWith(ModelFactory.Me.Generate())
            .MockSpotifyService(spotify =>
            {
                spotify.GetUser(Arg.Any<string>()).Returns(user);
                spotify
                .IsCurrentUserFollowingCreator(WebApp.Models.CreatorType.User, Arg.Any<string>())
                .Returns(true);
            })
            .CreateClient();

        // Act
        var response = await httpClient.GetAsync($"/Users/{user.Id}");
        var foundUser = await response.Content.ReadFromJsonAsync<UserProfileDto>();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        foundUser.Should().BeEquivalentTo(user);
        foundUser!.IsFollowed.Should().BeTrue();
    }
}
