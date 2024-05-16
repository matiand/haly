using Haly.WebApp.Controllers;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Haly.WebApp.Features.CurrentUser.TokenManagement;

// A filter for returning a '401 Unauthorized' when an action needs to call Spotify
// API, but the token is missing or invalid.
public class ValidateAccessTokenFilterService(ICurrentUserStore meStore) : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // PutCurrentUser action is responsible for managing the token, so we skip its validation.
        var actionName = context.ActionDescriptor.AttributeRouteInfo?.Name;
        if (actionName == nameof(MeController.PutCurrentUser)) return;

        var actionAttributes = context.ActionDescriptor.EndpointMetadata;
        var callsSpotifyApiAttribute = actionAttributes.OfType<CallsSpotifyApiAttribute>().SingleOrDefault();
        if (callsSpotifyApiAttribute is not null && meStore.IsEmpty)
        {
            context.Result = ProblemResponses.Unauthorized("Missing Spotify OAuth token");
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}
