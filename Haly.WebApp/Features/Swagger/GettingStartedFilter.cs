using DotSwashbuckle.AspNetCore.SwaggerGen;
using Microsoft.OpenApi.Models;

namespace Haly.WebApp.Features.Swagger;

// Explains why you need to call the PutCurrentUser action before other endpoints.
public class GettingStartedFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        operation.Summary = "Update current user";

        operation.Description = string.Join("<br/>",
            "Fetch the user associated with a given token from the Spotify API and update our cache. Subsequent API calls will use this token for endpoints that interact with the Spotify API.",
            operation.Description);

        operation.RequestBody.Description =
            "Spotify's access token. For debugging purposes you can visit <a href='https://developer.spotify.com/console/get-current-user' target='_blank'>Spotify Web Console</a> to get one.";
    }
}
