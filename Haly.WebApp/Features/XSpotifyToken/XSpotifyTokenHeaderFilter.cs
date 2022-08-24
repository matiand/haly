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
        if (methodAttributes.OfType<CallsSpotifyApiAttribute>().Any())
        {
            operation.Parameters ??= new List<OpenApiParameter>();
            operation.Parameters.Add(new OpenApiParameter()
            {
                Name = "X-Spotify-Token",
                In = ParameterLocation.Header,
                Required = true,
                Description =
                    "Access token to Spotify Web API, required for making requests to it.\nVisit <a href='https://developer.spotify.com/console/get-current-user'>Spotify Web Console</a> to get one.",
            });

            operation.Responses.Add("400", ProblemDetailsResponse(context, "Bad request"));
            operation.Responses.Add("401", ProblemDetailsResponse(context, "Unauthorized"));
            operation.Responses.Add("429", ProblemDetailsResponse(context, "Too many requests"));
        }
    }

    private static OpenApiResponse ProblemDetailsResponse(OperationFilterContext context, string description)
    {
        var problemDetailsMediaType = new OpenApiMediaType
        {
            Schema = context.SchemaGenerator.GenerateSchema(typeof(ProblemDetails), context.SchemaRepository),
        };

        return new OpenApiResponse
        {
            Description = description,
            Content = new Dictionary<string, OpenApiMediaType>
                { { "application/problem+json", problemDetailsMediaType } },
        };
    }
}
