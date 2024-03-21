using DotSwashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.OpenApi.Models;

namespace Haly.WebApp.Features.Swagger;

// Make sure 'Me' tag is shown first.
// Avoid using the 'Tags' attribute to annotate your actions and controllers, because we use a
// workaround for ordering tags (see below).
public class TagOrderFilter : IDocumentFilter
{
    public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
    {
        // Workaround for swaggerDoc having Tags not populated
        // https://github.com/domaindrivendev/Swashbuckle.WebApi/issues/1215
        var controllerNames = context.ApiDescriptions.Select(x => x.ActionDescriptor)
            .OfType<ControllerActionDescriptor>()
            .Select(x => x.ControllerName)
            .Distinct();

        swaggerDoc.Tags = controllerNames
            .OrderBy((name) => name.StartsWith("Me", StringComparison.InvariantCulture) ? 0 : 1)
            .Select(name => new OpenApiTag() { Name = name })
            .ToList();
    }
}
