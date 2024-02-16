using Haly.WebApp.Models;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.Models.Tracks;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Haly.WebApp.Data;

public class LibraryContext : DbContext
{
    [Obsolete("Obsolete")]
    static LibraryContext() => NpgsqlConnection.GlobalTypeMapper
        .MapEnum<Plan>()
        .MapEnum<TrackType>();

    public LibraryContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<PrivateUser> Users { get; set; }
    public DbSet<Playlist> Playlists { get; set; }
    public DbSet<PlaylistTrack> PlaylistTracks { get; set; }
    public DbSet<Lyrics> LyricsSet { get; set; }
    public DbSet<RefetchPlaylistTracksJob> RefetchPlaylistTracksJobs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresEnum<Plan>()
            .HasPostgresEnum<TrackType>();

        modelBuilder.Entity<PlaylistTrack>()
            .HasKey(t => new { t.PlaylistId, t.PositionInPlaylist });

        modelBuilder.Entity<Lyrics>(entity =>
        {
            entity.ToTable("Lyrics")
                .Property(l => l.Id)
                .ValueGeneratedNever();
        });
    }
}
