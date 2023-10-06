namespace Haly.WebApp.Features.CurrentUser.UpdatePlaylists;

public class DateOnlyService : IDateOnlyService
{
    public bool IsOlderThanAMonth(DateOnly? dateOnly)
    {
        if (dateOnly is null) return true;

        var monthAgo = DateOnly.FromDateTime(DateTime.Now.AddMonths(months: -1));
        return dateOnly < monthAgo;
    }
}
