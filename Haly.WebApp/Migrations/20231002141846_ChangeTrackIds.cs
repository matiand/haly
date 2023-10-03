using Haly.WebApp.Models.Tracks;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Haly.WebApp.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTrackIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpotifyId",
                table: "PlaylistTracks",
                newName: "PlaybackId");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "PlaylistTracks",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "PlaylistTracks");

            migrationBuilder.RenameColumn(
                name: "PlaybackId",
                table: "PlaylistTracks",
                newName: "SpotifyId");
        }
    }
}
