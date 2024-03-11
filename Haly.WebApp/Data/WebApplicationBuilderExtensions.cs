using Haly.WebApp.Models;
using Haly.WebApp.Models.Tracks;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Haly.WebApp.Data;

public static class WebApplicationBuilderExtensions
{
    public static void AddLibraryContext(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<LibraryContext>(opts =>
        {
            var connectionString = builder.Configuration.GetConnectionString("LibraryConnection")!;
            var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString)
                // Required for 'jsonb' columns to work.
                .EnableDynamicJson();

            dataSourceBuilder.MapEnum<Plan>();
            dataSourceBuilder.MapEnum<TrackType>();

            opts.UseNpgsql(dataSourceBuilder.Build(), connectionOpts => connectionOpts.EnableRetryOnFailure());

            if (builder.Environment.IsDevelopment())
            {
                opts.EnableSensitiveDataLogging();
            }
        });
    }
}
