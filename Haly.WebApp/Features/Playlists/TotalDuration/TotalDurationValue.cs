namespace Haly.WebApp.Features.Playlists.TotalDuration;

public class TotalDurationValue
{
    private readonly int _valueInMs;

    public TotalDurationValue(int valueInMs)
    {
        _valueInMs = valueInMs;
    }

    public string Format()
    {
        var timespan = TimeSpan.FromMilliseconds(_valueInMs);

        if ((int)timespan.TotalHours > 0)
        {
            if (timespan.Minutes > 0) return $"{(int)timespan.TotalHours} hr {timespan.Minutes} min";
            return $"{(int)timespan.TotalHours} hr";
        }

        if (timespan.Minutes > 0)
        {
            if (timespan.Seconds > 0) return $"{timespan.Minutes} min {timespan.Seconds} sec";
            return $"{timespan.Minutes} min";
        }

        return $"{timespan.Seconds} sec";
    }
}
