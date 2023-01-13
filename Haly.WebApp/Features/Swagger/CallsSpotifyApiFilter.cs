using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Haly.WebApp.Features.Swagger;

// Operation filter that adds documentation to endpoints that call Spotify API
// When using it in conjunction with SwaggerResponse, avoid using the Description field
// or this description will be overwritten
public class CallsSpotifyApiFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var methodAttributes = context.MethodInfo.GetCustomAttributes(inherit: true);
        var callsSpotifyApiAttr = methodAttributes.OfType<CallsSpotifyApiAttribute>().SingleOrDefault();

        if (callsSpotifyApiAttr is not null)
        {
            UpdateDescription(operation, callsSpotifyApiAttr);

            operation.Responses.Add("400", ProblemResponse(context, "Bad request"));
            operation.Responses.Add("401", ProblemResponse(context, "Unauthorized"));
            operation.Responses.Add("429", ProblemResponse(context, "Too many requests"));
        }
    }

    private static void UpdateDescription(OpenApiOperation operation, CallsSpotifyApiAttribute callsSpotifyApiAttr)
    {
        if (string.IsNullOrEmpty(operation.Description))
        {
            operation.Description = string.Join("<br/>", "This endpoint calls Spotify API.",
                $@"Scopes needed: <b> {callsSpotifyApiAttr.Scopes} </b>");
        }
        else
        {
            operation.Description =
                string.Join("<br/>", operation.Description,
                    "This endpoint calls Spotify API.",
                    $@"Scopes needed: <b> {callsSpotifyApiAttr.Scopes} </b>");
        }
    }

    private static OpenApiResponse ProblemResponse(OperationFilterContext context, string description)
    {
        var problemMediaType = new OpenApiMediaType
        {
            Schema = context.SchemaGenerator.GenerateSchema(typeof(Problem), context.SchemaRepository),
        };

        return new OpenApiResponse
        {
            Description = description,
            Content = new Dictionary<string, OpenApiMediaType>
                { { "application/json", problemMediaType } },
        };
    }
}
