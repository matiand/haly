using AutoFixture;
using FluentAssertions;
using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify.Mappings;
using Mapster;

namespace Haly.UnitTests.Spotify.Mappings;

public class AlbumObjectProfileTests
{
    private TypeAdapterConfig Config { get; } = new();
    private Fixture Fixture { get; } = new();

    public AlbumObjectProfileTests()
    {
        var profile = new AlbumObjectProfile();
        profile.Register(Config);
    }

    [Fact]
    public void Album_Type_IsOneSong_WhenTotalTracksIsOneAndBaseTypeIsSingle()
    {
        var src = Fixture.Build<AlbumObject>()
            .Without(a => a.Release_date)
            .Create();
        src.Album_type = AlbumBaseAlbum_type.Single;
        src.Total_tracks = 1;

        var dest = src.Adapt<AlbumDetailed>(Config);

        dest.Type.Should().Be(AlbumType.OneSong);
    }

    [Fact]
    public void Album_Type_IsEp_WhenTotalTracksIsBiggerThanOneAndBaseTypeIsSingle()
    {
        var src = Fixture.Build<AlbumObject>()
            .Without(a => a.Release_date)
            .Create();
        src.Album_type = AlbumBaseAlbum_type.Single;
        src.Total_tracks = 2;

        var dest = src.Adapt<AlbumDetailed>(Config);

        dest.Type.Should().Be(AlbumType.Ep);
    }

    [Fact]
    public void Album_Type_IsAlbum_WhenBaseTypeIsAlbum()
    {

        var src = Fixture.Build<AlbumObject>()
            .Without(a => a.Release_date)
            .Create();
        src.Album_type = AlbumBaseAlbum_type.Album;
        src.Total_tracks = 1;

        var dest = src.Adapt<AlbumDetailed>(Config);

        dest.Type.Should().Be(AlbumType.Album);

    }

    [Fact]
    public void Album_Type_IsAlbum_WhenBaseTypeIsCompilation()
    {
        var src = Fixture.Build<AlbumObject>()
            .Without(a => a.Release_date)
            .Create();
        src.Album_type = AlbumBaseAlbum_type.Compilation;

        var dest = src.Adapt<AlbumDetailed>(Config);

        dest.Type.Should().Be(AlbumType.Compilation);
    }

    [Theory]
    [InlineData("Foo", "© Foo")]
    [InlineData("(C) Foo", "© Foo")]
    [InlineData("© Foo", "© Foo")]
    public void Album_Copyright_AlwaysStartsWithTheSing(string text, string expected)
    {
        var src = Fixture.Build<AlbumObject>()
            .Without(a => a.Release_date)
            .Create();
        src.Copyrights.Add(new() { Text = text, Type = "C" });

        var dest = src.Adapt<AlbumDetailed>(Config);

        dest.Copyrights.Count.Should().Be(expected: 1);
        dest.Copyrights.Should().Contain(x => x == expected);
    }

    [Theory]
    [InlineData("Foo", "℗ Foo")]
    [InlineData("(P) Foo", "℗ Foo")]
    [InlineData("℗ Foo", "℗ Foo")]
    public void Album_SoundRecordingCopyright_AlwaysStartsWithTheSign(string text, string expected)
    {
        var src = Fixture.Build<AlbumObject>()
            .Without(a => a.Release_date)
            .Create();
        src.Copyrights.Add(new() { Text = text, Type = "P" });

        var dest = src.Adapt<AlbumDetailed>(Config);

        dest.Copyrights.Count.Should().Be(expected: 1);
        dest.Copyrights.Should().Contain(x => x == expected);
    }

    [Fact]
    public void Album_ReleaseDate_HasYearMappedCorrectly_WhenOnlyYearIsSpecified()
    {
        var src = Fixture.Build<AlbumObject>()
            .Create();
        src.Release_date = "2022";

        var dest = src.Adapt<AlbumDetailed>(Config);

        dest.ReleaseDate.Year.Should().Be(expected: 2022);
    }
}
