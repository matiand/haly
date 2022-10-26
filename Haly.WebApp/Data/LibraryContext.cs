using Haly.WebApp.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Haly.WebApp.Data;

public class LibraryContext : DbContext
{
    static LibraryContext() => NpgsqlConnection.GlobalTypeMapper
        .MapEnum<Plan>()
        .MapEnum<TrackType>();

    public LibraryContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Playlist> Playlists { get; set; }
    public DbSet<Track> Tracks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresEnum<Plan>()
            .HasPostgresEnum<TrackType>();

        modelBuilder.Entity<Playlist>()
            .HasKey(playlist => new { playlist.Id, playlist.UserId });

        modelBuilder.Entity<Track>()
            .HasOne(track => track.Playlist)
            .WithMany(playlist => playlist.Tracks)
            .HasForeignKey(track => new { track.PlaylistId, track.UserId });
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
