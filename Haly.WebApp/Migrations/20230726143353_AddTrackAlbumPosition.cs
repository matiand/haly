using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Haly.WebApp.Migrations
{
    /// <inheritdoc />
    public partial class AddTrackAlbumPosition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AlbumPosition",
                table: "PlaylistTracks",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlbumPosition",
                table: "PlaylistTracks");
        }
    }
}
