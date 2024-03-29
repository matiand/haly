namespace Haly.WebApp.Features.CurrentUser.UpdatePlaylists;

public interface IDateOnlyService
{
    public bool IsOlderThanAMonth(DateOnly? dateOnly);
    public bool IsOlderThanSixMonths(DateOnly? dateOnly);
    public bool IsMonday();
    public bool IsFriday();
}
