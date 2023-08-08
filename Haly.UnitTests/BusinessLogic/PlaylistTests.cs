using AutoFixture;
using AutoFixture.Xunit2;
using FluentAssertions;
using Haly.WebApp.Models;

namespace Haly.UnitTests.BusinessLogic;

public class PlaylistTests
{
    [Theory]
    [InlineData("Release Radar", "spotify")]
    [InlineData("Discover Weekly", "spotify")]
    [InlineData("Daily Mix 6", "spotify")]
    [InlineData("Chill Mix", "spotify")]
    [InlineData("2000s Mix", "spotify")]
    [InlineData("Your Top Songs 2022", "spotify")]
    [InlineData("Repeat Rewind", "spotify")]
    [InlineData("On Repeat", "spotify")]
    [InlineData("Your Time Capsule", "spotify")]
    public void IsPersonalized_ReturnsTrue_WhenPlaylistWasMadeForUs(string name, string ownerId)
    {
        var fixture = new Fixture();
        var playlist = fixture.Create<Playlist>();
        playlist.Name = name;
        playlist.Metadata.Owner.Id = ownerId;

        playlist.IsPersonalized.Should().Be(expected: true);
    }

    [Theory, AutoData]
    [InlineData("Release Radar", "foo")]
    [InlineData("Discover Weekly", "bar")]
    [InlineData("Daily Mix 1", "spotifyy")]
    [InlineData("Chill Mix", "Spotify")]
    [InlineData("Sofia Kourtesis track IDs", "spotify")]
    [InlineData("Alternative 00s", "spotify")]
    [InlineData("Best of Indie 2011", "spotify")]
    public void IsPersonalized_ReturnsFalse_ForRegularPlaylists(string name, string ownerId)
    {
        var fixture = new Fixture();
        var playlist = fixture.Create<Playlist>();
        playlist.Name = name;
        playlist.Metadata.Owner.Id = ownerId;

        playlist.IsPersonalized.Should().Be(expected: false);
    }
}
