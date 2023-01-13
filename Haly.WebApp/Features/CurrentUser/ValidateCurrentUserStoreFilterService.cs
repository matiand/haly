using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Haly.WebApp.Features.CurrentUser;

// A filter for returning 400 Bad Request when an action needs to call Spotify
// API, but CurrentUserStore is empty
public class ValidateCurrentUserStoreFilterService : IActionFilter
{
    private readonly CurrentUserStore _currentUserStore;

    public ValidateCurrentUserStoreFilterService(CurrentUserStore currentUserStore)
    {
        _currentUserStore = currentUserStore;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        var actionAttributes = context.ActionDescriptor.EndpointMetadata;
        var callsSpotifyApiAttr = actionAttributes.OfType<CallsSpotifyApiAttribute>().SingleOrDefault();

        if (callsSpotifyApiAttr is not null && _currentUserStore.IsEmpty)
        {
            context.Result = ProblemResponses.BadRequestProblem("Current user is missing. Did you forgot to authenticate with Spotify API and send the token to our API?.");
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}
