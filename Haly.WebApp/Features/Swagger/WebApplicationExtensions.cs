namespace Haly.WebApp.Features.Swagger;

public static class WebApplicationExtensions
{
    /// <summary>
    /// Add Swagger UI.
    /// </summary>
    public static void UseSwaggerIfDevelopment(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.EnableTryItOutByDefault();
                options.EnableDeepLinking();
            });
        }
    }
}
