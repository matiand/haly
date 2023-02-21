﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Haly.WebApp.Migrations
{
    [DbContext(typeof(LibraryContext))]
    partial class LibraryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "plan", new[] { "free", "premium" });
            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "track_type", new[] { "song", "podcast" });
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Haly.WebApp.Models.Jobs.RefetchPlaylistTracksJob", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("PlaylistId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("RefetchPlaylistTracksJobs");
                });

            modelBuilder.Entity("Haly.WebApp.Models.Playlist", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<PlaylistMetadata>("Metadata")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SnapshotId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Playlists");
                });

            modelBuilder.Entity("Haly.WebApp.Models.Track", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("AddedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Album>("Album")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<List<Artist>>("Artists")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<int>("DurationInMs")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PlaylistId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SpotifyId")
                        .HasColumnType("text");

                    b.Property<TrackType>("Type")
                        .HasColumnType("track_type");

                    b.HasKey("Id");

                    b.HasIndex("PlaylistId");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("Haly.WebApp.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<List<string>>("LinkedPlaylistsOrder")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<string>("Market")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Plan>("Plan")
                        .HasColumnType("plan");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Haly.WebApp.Models.Jobs.RefetchPlaylistTracksJob", b =>
                {
                    b.HasOne("Haly.WebApp.Models.User", "User")
                        .WithMany("RefetchPlaylistTracksJobs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Haly.WebApp.Models.Track", b =>
                {
                    b.HasOne("Haly.WebApp.Models.Playlist", "Playlist")
                        .WithMany("Tracks")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Playlist");
                });

            modelBuilder.Entity("Haly.WebApp.Models.Playlist", b =>
                {
                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("Haly.WebApp.Models.User", b =>
                {
                    b.Navigation("RefetchPlaylistTracksJobs");
                });
#pragma warning restore 612, 618
        }
    }
}
