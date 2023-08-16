using Haly.WebApp.Models.Tracks;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Haly.WebApp.Migrations
{
    /// <inheritdoc />
    public partial class AddPlaylistTrackQueryData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArtistNames",
                table: "PlaylistTracks");

            migrationBuilder.RenameColumn(
                name: "AlbumPosition",
                table: "PlaylistTracks",
                newName: "PositionInAlbum");

            migrationBuilder.AddColumn<PlaylistTrackQueryData>(
                name: "QueryData",
                table: "PlaylistTracks",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QueryData",
                table: "PlaylistTracks");

            migrationBuilder.RenameColumn(
                name: "PositionInAlbum",
                table: "PlaylistTracks",
                newName: "AlbumPosition");

            migrationBuilder.AddColumn<string>(
                name: "ArtistNames",
                table: "PlaylistTracks",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
