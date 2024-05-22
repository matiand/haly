using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Haly.WebApp.Features.Playlists;
using Mapster;
using NSubstitute;

namespace Haly.IntegrationTests.Controllers.MeController;

public class CreatePlaylistTests(HalyApiFactory apiFactory) : IClassFixture<HalyApiFactory>
{
    [Fact]
    public async Task Create_Returns201Created_WhenPlaylistIsCreated()
    {
        // Arrange
        var newPlaylist = ModelFactory.Playlist.Generate();

        var httpClient = apiFactory
            .AuthenticateWith(ModelFactory.Me.Generate())
            .MockSpotifyService(spotify =>
            {
                spotify.CreatePlaylist(Arg.Any<string>(), Arg.Any<string>()).Returns(newPlaylist);
            })
            .CreateClient();

        // Act
        var response = await httpClient.PostAsync($"/Me/playlists?name={newPlaylist.Name}", null!);

        // Assert
        var createdPlaylist = await response.Content.ReadFromJsonAsync<PlaylistBriefDto>();
        response.StatusCode.Should().Be(HttpStatusCode.Created);
        response.Headers.Location!.AbsolutePath.Should().Be($"/Playlists/{createdPlaylist!.Id}");
        createdPlaylist.Should().BeEquivalentTo(newPlaylist.Adapt<PlaylistBriefDto>());
    }
}
