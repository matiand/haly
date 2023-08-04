using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Haly.WebApp.Migrations
{
    /// <inheritdoc />
    public partial class AddTrackArtistNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ArtistNames",
                table: "PlaylistTracks",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArtistNames",
                table: "PlaylistTracks");
        }
    }
}
