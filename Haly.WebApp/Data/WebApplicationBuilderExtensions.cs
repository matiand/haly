using Haly.WebApp.Models;
using Haly.WebApp.Models.Tracks;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Haly.WebApp.Data;

public static class WebApplicationBuilderExtensions
{
    public static void AddLibraryContext(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("LibraryConnection")!;
        var dataSource = BuildDataSource(builder, connectionString);

        builder.Services.AddDbContext<LibraryContext>(opts =>
        {
            opts.UseNpgsql(dataSource, connectionOpts => connectionOpts.EnableRetryOnFailure());
        });
    }

    private static NpgsqlDataSource BuildDataSource(WebApplicationBuilder builder, string connectionString)
    {
        var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString)
            // Required for 'jsonb' columns to work.
            .EnableDynamicJson();

        dataSourceBuilder.MapEnum<Plan>();
        dataSourceBuilder.MapEnum<TrackType>();

        if (builder.Environment.IsDevelopment())
        {
            dataSourceBuilder.EnableParameterLogging();
        }

        return dataSourceBuilder.Build();
    }
}
