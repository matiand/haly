namespace Haly.WebApp.Features.CurrentUser.UpdatePlaylists;

public interface IDateOnlyService
{
    public bool IsOlderThanAMonth(DateOnly? dateOnly);
}
