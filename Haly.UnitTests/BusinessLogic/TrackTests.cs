using FluentAssertions;
using Haly.WebApp.Models;

namespace Haly.UnitTests.BusinessLogic;

public class TrackTests
{
    [Theory]
    [InlineData(4333, "0:04")]
    [InlineData(8546, "0:08")]
    [InlineData(11874, "0:11")]
    [InlineData(59760, "0:59")]
    [InlineData(117906, "1:57")]
    [InlineData(239894, "3:59")]
    [InlineData(410256, "6:50")]
    [InlineData(714093, "11:54")]
    [InlineData(2565040, "42:45")]
    [InlineData(3600000, "1:00:00")]
    [InlineData(7357869, "2:02:37")]
    // Our duration formatting mimics the format displayed on the playing bar. However, it's worth
    // noting that in some cases, tracks within a playlist may appear to have different durations than on
    // the playing bar. This happens because of 'Track Relinking'.
    // https://developer.spotify.com/documentation/web-api/concepts/track-relinking
    public void Duration_ReturnsFormattedStringSpotifyStyle(int valueInMs, string expected)
    {
        var track = new PlaylistTrack() { DurationInMs = valueInMs };

        var actual = track.Duration;

        actual.Should().Be(expected);
    }
}
