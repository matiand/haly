using FluentAssertions;
using Haly.WebApp.Features.Playlists.TotalDuration;

namespace Haly.UnitTests.BusinessLogic;

public class TotalDurationValueTests
{
    [Theory]
    [InlineData(11173, "11 sec")]
    [InlineData(55053, "55 sec")]
    [InlineData(59999, "59 sec")]
    public void Format_DropsHoursAndMinutes_WhenInputIsLessThanMinute(int valueInMs, string expected)
    {
        var totalDuration = new TotalDurationValue(valueInMs);

        var actual = totalDuration.Format();

        actual.Should().Be(expected);
    }

    [Theory]
    [InlineData(66226, "1 min 6 sec")]
    [InlineData(1490571, "24 min 50 sec")]
    [InlineData(3599999, "59 min 59 sec")]
    public void Format_DropsHours_WhenInputIsLessThanHour(int valueInMs, string expected)
    {
        var totalDuration = new TotalDurationValue(valueInMs);

        var actual = totalDuration.Format();

        actual.Should().Be(expected);
    }

    [Theory]
    [InlineData(3608298, "1 hr")]
    [InlineData(3660000, "1 hr 1 min")]
    [InlineData(6308309, "1 hr 45 min")]
    [InlineData(9352561, "2 hr 35 min")]
    [InlineData(33011306, "9 hr 10 min")]
    public void Format_DropsSeconds_WhenInputIsBiggerThanOrEqualHour(int valueInMs, string expected)
    {
        var totalDuration = new TotalDurationValue(valueInMs);

        var actual = totalDuration.Format();

        actual.Should().Be(expected);
    }

    [Theory]
    [InlineData(86399999, "23 hr 59 min")]
    [InlineData(86400000, "24 hr")]
    [InlineData(150424424, "41 hr 47 min")]
    [InlineData(721968602, "200 hr 32 min")]
    public void Format_KeepsHourAsTheLargestUnit_WhenInputIsBiggerThanADay(int valueInMs, string expected)
    {
        var totalDuration = new TotalDurationValue(valueInMs);

        var actual = totalDuration.Format();

        actual.Should().Be(expected);
    }

    [Theory]
    [InlineData(3540499, "59 min")]
    [InlineData(3608298, "1 hr")]
    [InlineData(86459999, "24 hr")]
    public void Format_DropsSmallerUnit_WhenTheyEqualZero(int valueInMs, string expected)
    {
        var totalDuration = new TotalDurationValue(valueInMs);

        var actual = totalDuration.Format();

        actual.Should().Be(expected);
    }
}
