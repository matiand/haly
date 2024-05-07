using AutoFixture;
using FluentAssertions;
using Haly.GeneratedClients;
using Haly.WebApp.Models.Tracks;
using Haly.WebApp.ThirdPartyApis.Spotify.Mappings;
using Mapster;
using Track = Haly.WebApp.Models.Tracks.Track;

namespace Haly.UnitTests.Spotify.Mappings;

public class TrackObjectProfileTests
{
    private TypeAdapterConfig Config { get; } = new();
    private Fixture Fixture { get; } = new();

    public TrackObjectProfileTests()
    {
        var profile = new TrackObjectProfile();
        profile.Register(Config);
    }

    [Fact]
    public void Track_Id_IsTakenFromId_WhenTrackIsNotRelinked()
    {
        var src = Fixture.Build<TrackObject>()
            .Without(t => t.Linked_from)
            .Create();

        var dest = src.Adapt<Track>(Config);

        dest.Id.Should().Be(src.Id);
    }

    [Fact]
    public void Track_Id_IsTakenFromRelinkedId_WhenTrackIsRelinked()
    {
        var src = Fixture.Build<TrackObject>().Create();

        var dest = src.Adapt<Track>(Config);

        dest.Id.Should().Be(src.Linked_from!.Id);
    }

    [Theory]
    [InlineData(TrackObjectType.Track, TrackType.Song)]
    [InlineData(TrackObjectType.Episode, TrackType.Podcast)]
    public void Track_Type_IsMappedCorrectly(TrackObjectType actual, TrackType expected)
    {
        var src = Fixture.Build<TrackObject>().Create();
        src.Type = actual;

        var dest = src.Adapt<Track>(Config);

        dest.Type.Should().Be(expected);
    }

    [Fact]
    public void PlaylistTrack_QueryData_Contains_TrackName_AlbumName_FirstArtistName()
    {
        var src = Fixture.Build<TrackObject>().Create();

        var dest = src.Adapt<PlaylistTrack>(Config);

        dest.QueryData.Should().NotBeNull();
        dest.QueryData.Name.Should().Be(src.Name);
        dest.QueryData.AlbumName.Should().Be(src.Album.Name);
        dest.QueryData.ArtistName.Should().Be(src.Artists.First().Name);
    }

    [Fact]
    public void PlaylistTrack_QueryData_AllArtistNames_IsAStringWithEveryArtistName_SeparatedByASpace()
    {
        var src = Fixture.Build<TrackObject>().Create();

        var dest = src.Adapt<PlaylistTrack>(Config);

        dest.QueryData.AllArtistNames.Should().Be(string.Join(separator: ' ', src.Artists.Select(a => a.Name)));
    }

    [Theory]
    [InlineData("the")]
    [InlineData("a")]
    [InlineData("an")]
    public void PlaylistTrack_QueryData_TrimsArticles_FromPropertiesUsedForOrdering(string article)
    {
        var src = Fixture.Build<TrackObject>().Create();
        var originalName = src.Name;
        var originalAlbumName = src.Album.Name;
        var originalFirstArtistName = src.Artists.First().Name;

        src.Name = src.Name.Insert(startIndex: 0, $"{article} ");
        src.Album.Name = src.Album.Name.Insert(startIndex: 0, $"{article} ");
        src.Artists = new[]
        {
            new ArtistObject()
            {
                Name = originalFirstArtistName.Insert(startIndex: 0, $"{article} ")
            },
        };
        var dest = src.Adapt<PlaylistTrack>(Config);

        dest.QueryData.Name.Should().Be(originalName);
        dest.QueryData.AlbumName.Should().Be(originalAlbumName);
        dest.QueryData.ArtistName.Should().Be(originalFirstArtistName);
    }
}
