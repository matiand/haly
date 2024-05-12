using AutoFixture;
using FluentAssertions;
using Haly.WebApp.Models;

namespace Haly.UnitTests.BusinessLogic;

public class AlbumDetailedTests
{
    [Fact]
    public void FormattedReleaseDate_ReturnsOnlyTheYear_WhenDateIsFirstJanuary()
    {
        var album = new AlbumDetailed()
        {
            ReleaseDate = DateOnly.ParseExact("2022-01-01", "yyyy-MM-dd"),
        };

        album.FormattedReleaseDate.Should().Be("2022");
    }

    [Theory]
    [InlineData("2024-01-02", "January 2, 2024")]
    [InlineData("2024-05-04", "May 4, 2024")]
    [InlineData("1994-03-21", "March 21, 1994")]
    public void FormattedReleaseDate_ReturnsFormattedDateSpotifyStyle_WhenDateIsNotFirstJanuary(string input, string expected)
    {
        var album = new AlbumDetailed()
        {
            ReleaseDate = DateOnly.ParseExact(input, "yyyy-MM-dd"),
        };

        album.FormattedReleaseDate.Should().Be(expected);
    }
}
