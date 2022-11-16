using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Haly.WebApp.Features.XSpotifyToken;

// Description of endpoints that need X-Spotify-Token header for Swagger UI
public class XSpotifyTokenHeaderFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var methodAttributes = context.MethodInfo.GetCustomAttributes(inherit: true);
        var callsSpotifyApiAttr = methodAttributes.OfType<CallsSpotifyApiAttribute>().SingleOrDefault();

        if (callsSpotifyApiAttr is not null)
        {
            operation.Parameters ??= new List<OpenApiParameter>();
            operation.Parameters.Add(new OpenApiParameter
            {
                Name = "X-Spotify-Token",
                In = ParameterLocation.Header,
                Required = true,
                Description = $@"Access token to Spotify Web API, required for making requests to it.
                            Visit <a href='https://developer.spotify.com/console/get-current-user' target='_blank'>Spotify Web Console</a> to get one.<br/>
                            Scopes needed: <b> {callsSpotifyApiAttr.Scopes} </b>",
                Schema = new OpenApiSchema { Type = "string" },
            });

            operation.Responses.Add("400", ProblemResponse(context, "Bad request"));
            operation.Responses.Add("401", ProblemResponse(context, "Unauthorized"));
            operation.Responses.Add("429", ProblemResponse(context, "Too many requests"));
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
