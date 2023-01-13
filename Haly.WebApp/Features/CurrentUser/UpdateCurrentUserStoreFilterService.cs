using Microsoft.AspNetCore.Mvc.Filters;

namespace Haly.WebApp.Features.CurrentUser;

public class UpdateCurrentUserStoreFilterService : IAsyncActionFilter
{
    private readonly CurrentUserStore _currentUserStore;

    public UpdateCurrentUserStoreFilterService(CurrentUserStore currentUserStore)
    {
        _currentUserStore = currentUserStore;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var tokenArg = context.ActionArguments.First().Value;
        if (tokenArg is string spotifyToken)
        {
            await _currentUserStore.Update(spotifyToken);
        }

        await next();
    }
}
