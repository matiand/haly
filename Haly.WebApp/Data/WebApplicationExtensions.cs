using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Haly.WebApp.Data;

public static class WebApplicationExtensions
{
    public static void ApplyMigrations(this WebApplication app)
    {
        var skipMigrationsEnv = app.Configuration["SKIP_DATABASE_MIGRATIONS"];
        if (skipMigrationsEnv == "true") return;

        var serviceScopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();
        using var serviceScope = serviceScopeFactory.CreateScope();
        using var ctx = serviceScope.ServiceProvider.GetRequiredService<LibraryContext>();
        ctx.Database.Migrate();

        // If any migration changed our enums, we need to call ReloadTypes to pick up the changes.
        using var connection = (NpgsqlConnection)ctx.Database.GetDbConnection();
        connection.Open();
        connection.ReloadTypes();
    }
}
