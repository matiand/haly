using Microsoft.OpenApi.Models;

namespace Haly.WebApp.Features.Swagger;

public static class WebApplicationBuilderExtensions
{
    /// <summary>
    /// Add and configure services for Swagger middleware.
    /// </summary>
    public static void AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Haly API",
                Description =
                    "An ASP.NET Core Web API that adds quality of life improvements to Spotify and helps with music exploration",
            });

            options.CustomOperationIds(description => description.ActionDescriptor.RouteValues["action"]);
            options.SchemaFilter<RequireNonNullablePropertiesSchemaFilter>();
            options.EnableAnnotations();
            options.SupportNonNullableReferenceTypes();
            options.UseAllOfToExtendReferenceSchemas();

            options.DocumentFilter<TagOrderFilter>();
            options.OperationFilter<CallsSpotifyApiFilter>();
        });
    }
}
