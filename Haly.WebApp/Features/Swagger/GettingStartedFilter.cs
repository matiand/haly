using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Haly.WebApp.Features.Swagger;

// todo: make sure this still makes sense
// Explains why you need to call the PutCurrentUser action before other endpoints
public class GettingStartedFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        operation.Summary = "Update current user";

        operation.Description = string.Join("<br/>",
            "Updates the User linked with specified token by fetching him from Spotify API, creates a new one for first time clients. Successful response links that token with our CurrentUser, and allows us to use endpoints that call Spotify API.",
            operation.Description);

        operation.RequestBody.Description =
            "Spotify's access token. For debugging purposes you can visit <a href='https://developer.spotify.com/console/get-current-user' target='_blank'>Spotify Web Console</a> to get one.";
    }
}
