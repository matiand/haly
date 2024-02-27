namespace Haly.WebApp.Features.CurrentUser.UpdatePlaylists;

public class DateOnlyService : IDateOnlyService
{
    public bool IsOlderThanAMonth(DateOnly? dateOnly)
    {
        if (dateOnly is null) return true;

        var monthAgo = DateOnly.FromDateTime(DateTime.Now.AddMonths(months: -1));
        return dateOnly < monthAgo;
    }

    public bool IsMonday()
    {
        return DateTime.Now.DayOfWeek == DayOfWeek.Monday;
    }

    public bool IsFriday()
    {
        return DateTime.Now.DayOfWeek == DayOfWeek.Friday;
    }
}
