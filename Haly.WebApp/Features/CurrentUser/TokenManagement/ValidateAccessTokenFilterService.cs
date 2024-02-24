using Haly.WebApp.Controllers;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Haly.WebApp.Features.CurrentUser.TokenManagement;

// A filter for returning 400 Bad Request when an action needs to call Spotify
// API, but the token is missing or invalid.
public class ValidateAccessTokenFilterService : IActionFilter
{
    private readonly CurrentUserStore _currentUserStore;

    public ValidateAccessTokenFilterService(CurrentUserStore currentUserStore)
    {
        _currentUserStore = currentUserStore;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        // PutCurrentUser action is responsible for managing the token, so we skip its validation.
        var actionName = context.ActionDescriptor.AttributeRouteInfo?.Name;
        if (actionName == nameof(MeController.PutCurrentUser)) return;

        var actionAttributes = context.ActionDescriptor.EndpointMetadata;
        var callsSpotifyApiAttribute = actionAttributes.OfType<CallsSpotifyApiAttribute>().SingleOrDefault();
        if (callsSpotifyApiAttribute is not null && _currentUserStore.IsEmpty)
        {
            context.Result = ProblemResponses.BadRequest("Missing or invalid token. Did you forget to authenticate with Spotify API and send the token to our API?.");
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}
