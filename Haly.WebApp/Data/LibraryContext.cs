using Haly.WebApp.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Haly.WebApp.Data;

public class LibraryContext : DbContext
{
    static LibraryContext() => NpgsqlConnection.GlobalTypeMapper.MapEnum<Plan>();

    public LibraryContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Playlist> Playlists { get; set; }
    public DbSet<Track> Tracks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<Plan>();
    }
}

public static class WebApplicationExtensions
{
    public static void ApplyMigrations(this WebApplication app)
    {
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
