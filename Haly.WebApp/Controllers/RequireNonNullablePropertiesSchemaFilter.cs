using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Haly.WebApp.Controllers;

public class RequireNonNullablePropertiesSchemaFilter : ISchemaFilter
{
    // Taken from https://stackoverflow.com/questions/46576234/swashbuckle-make-non-nullable-properties-required/68987970#68987970
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        var additionalRequiredProps = schema.Properties
            .Where(x => !x.Value.Nullable && !schema.Required.Contains(x.Key))
            .Select(x => x.Key);

        foreach (var propKey in additionalRequiredProps)
        {
            schema.Required.Add(propKey);
        }
    }
}
