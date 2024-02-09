﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Tracks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Haly.WebApp.Migrations
{
    [DbContext(typeof(LibraryContext))]
    [Migration("20240208143218_AddPlaylistThumbnailUrl")]
    partial class AddPlaylistThumbnailUrl
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0-preview.1.23111.4")
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

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("text");

                    b.Property<int>("LikesTotal")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Owner>("Owner")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<string>("SnapshotId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ThumbnailUrl")
                        .HasColumnType("text");

                    b.Property<DateOnly?>("UpdatedAt")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("Playlists");
                });

            modelBuilder.Entity("Haly.WebApp.Models.PrivateUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
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

            modelBuilder.Entity("Haly.WebApp.Models.Tracks.PlaylistTrack", b =>
                {
                    b.Property<string>("PlaylistId")
                        .HasColumnType("text");

                    b.Property<int>("PositionInPlaylist")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("AddedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<AlbumBrief>("Album")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<List<ArtistBrief>>("Artists")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<int>("DurationInMs")
                        .HasColumnType("integer");

                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<bool>("IsExplicit")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPlayable")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PlaybackId")
                        .HasColumnType("text");

                    b.Property<int>("PositionInAlbum")
                        .HasColumnType("integer");

                    b.Property<PlaylistTrackQueryData>("QueryData")
                        .IsRequired()
                        .HasColumnType("jsonb");

                    b.Property<TrackType>("Type")
                        .HasColumnType("track_type");

                    b.HasKey("PlaylistId", "PositionInPlaylist");

                    b.ToTable("PlaylistTracks");
                });

            modelBuilder.Entity("Haly.WebApp.Models.Jobs.RefetchPlaylistTracksJob", b =>
                {
                    b.HasOne("Haly.WebApp.Models.PrivateUser", "User")
                        .WithMany("RefetchPlaylistTracksJobs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Haly.WebApp.Models.Tracks.PlaylistTrack", b =>
                {
                    b.HasOne("Haly.WebApp.Models.Playlist", null)
                        .WithMany("Tracks")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Haly.WebApp.Models.Playlist", b =>
                {
                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("Haly.WebApp.Models.PrivateUser", b =>
                {
                    b.Navigation("RefetchPlaylistTracksJobs");
                });
#pragma warning restore 612, 618
        }
    }
}
