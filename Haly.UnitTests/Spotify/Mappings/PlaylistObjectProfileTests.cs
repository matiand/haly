using AutoFixture;
using FluentAssertions;
using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify.Mappings;
using Mapster;

namespace Haly.UnitTests.Spotify.Mappings;

public class PlaylistObjectProfileTests
{
    private TypeAdapterConfig Config { get; } = new();
    private Fixture Fixture { get; } = new();

    public PlaylistObjectProfileTests()
    {
        var profile = new PlaylistObjectProfile();
        profile.Register(Config);
    }

    [Fact]
    public void Playlist_ImageUrl_IsTakenFromTheMiddleOfTheImagesProperty()
    {
        var src = Fixture.Build<PlaylistObject>().Create();
        src.Images = new[]
        {
            new ImageObject() { Url = "1" },
            new ImageObject() { Url = "2" },
            new ImageObject() { Url = "3" },
            new ImageObject() { Url = "4" },
        };

        var dest = src.Adapt<Playlist>(Config);

        dest.ImageUrl.Should().BeOneOf(src.Images.Skip(count: 1).SkipLast(count: 1).Select(x => x.Url));
    }

    [Fact]
    public void Playlist_ThumbnailUrl_IsTheLastUrlFromImagesProperty()
    {
        var src = Fixture.Build<PlaylistObject>().Create();
        src.Images = new[]
        {
            new ImageObject() { Url = "1" },
            new ImageObject() { Url = "2" },
            new ImageObject() { Url = "3" },
            new ImageObject() { Url = "4" },
        };

        var dest = src.Adapt<Playlist>(Config);

        dest.ThumbnailUrl.Should().Be("4");
    }

    [Theory]
    [InlineData("Foo bar baz", "Foo bar baz")]
    [InlineData("The official FIFA 19 Soundtrack is now here! For more on the game, the complete soundtrack line-up, and all things music including a Hans Zimmer score and music artists FUT kits, click <a href=\"http://x.ea.com/49445\">here.</a>", "The official FIFA 19 Soundtrack is now here!")]
    [InlineData("<a href=spotify:playlist:37i9dQZF1EIXpVFwPc2SQA>Caribou</a>, <a href=spotify:playlist:37i9dQZF1EIUxvGJ2wgRak>RÜFÜS DU SOL</a>, <a href=spotify:playlist:37i9dQZF1EIVF4h5pW5GmX>Joy Orbison</a> and more", "")]
    [InlineData("<a href=\"http://www.needforspeed.com/\">Need For Speed</a> (2015) original soundtrack features 64 songs, available in-game on November 3rd. Enjoy this mix of the upcoming soundtrack. For a complete list of songs: www.needforspeed.com/news/soundtrack", "Enjoy this mix of the upcoming soundtrack. For a complete list of songs: www.needforspeed.com/news/soundtrack")]
    public void Playlist_Description_IsTrimmedFromAnchorTags(string text, string expected)
    {
        var src = Fixture.Build<PlaylistObject>().Create();
        src.Description = text;

        var dest = src.Adapt<Playlist>(Config);

        dest.Description.Should().Be(expected);
    }

    [Theory]
    [InlineData("&#x27;", "'")]
    [InlineData("&amp; &lt; &gt; &quot; foo", "& < > \" foo")]
    public void Playlist_Description_DecodesHtmlCharacters(string text, string expected)
    {
        var src = Fixture.Build<PlaylistObject>().Create();
        src.Description = text;

        var dest = src.Adapt<Playlist>(Config);

        dest.Description.Should().Be(expected);
    }
}
