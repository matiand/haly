using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Haly.WebApp.Migrations
{
    public partial class AddPlaylistMetadataTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Playlists");

            migrationBuilder.RenameColumn(
                name: "Owner",
                table: "Playlists",
                newName: "Metadata");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Metadata",
                table: "Playlists",
                newName: "Owner");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Playlists",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Playlists",
                type: "text",
                nullable: true);
        }
    }
}
