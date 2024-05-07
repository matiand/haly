using AutoFixture;
using FluentAssertions;
using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify.Mappings;
using Mapster;

namespace Haly.UnitTests.Spotify.Mappings;

public class CurrentlyPlayingContextProfileTests
{
    private TypeAdapterConfig Config { get; } = new();
    private Fixture Fixture { get; } = new();

    public CurrentlyPlayingContextProfileTests()
    {
        var profile = new CurrentlyPlayingObjectProfile();
        profile.Register(Config);
    }

    [Theory]
    [InlineData("foo", "album")]
    [InlineData("bar", "playlist")]
    public void PlaybackState_Context_IsNotNull_WhenSourceDescribesAnAlbumOrPlaylist(string id, string type)
    {
        var src = Fixture.Build<CurrentlyPlayingContextObject>().Create();
        src.Context!.Uri = $"spotify:{type}:{id}";
        src.Context.Type = type;

        var dest = src.Adapt<PlaybackState>(Config);

        dest.Context.Should().NotBeNull();
        dest.Context!.EntityId.Should().Be(id);
        dest.Context!.Type.Should().Be(type);
    }

    [Theory]
    [InlineData("foo", "artist")]
    [InlineData("bar", "user")]
    public void PlaybackState_Context_IsNull_WhenSourceDescribesAnAlbumOrPlaylist(string id, string type)
    {
        var src = Fixture.Build<CurrentlyPlayingContextObject>().Create();
        src.Context!.Uri = $"spotify:{type}:{id}";
        src.Context.Type = type;

        var dest = src.Adapt<PlaybackState>(Config);

        dest.Context.Should().BeNull();
    }
}
