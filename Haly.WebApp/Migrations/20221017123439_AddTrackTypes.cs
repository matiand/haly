using Haly.WebApp.Models;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Haly.WebApp.Migrations
{
    public partial class AddTrackTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:plan", "free,premium")
                .Annotation("Npgsql:Enum:track_type", "song,podcast")
                .OldAnnotation("Npgsql:Enum:plan", "free,premium");

            migrationBuilder.AddColumn<TrackType>(
                name: "Type",
                table: "Tracks",
                type: "track_type",
                nullable: false,
                defaultValue: TrackType.Song);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Tracks");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:plan", "free,premium")
                .OldAnnotation("Npgsql:Enum:plan", "free,premium")
                .OldAnnotation("Npgsql:Enum:track_type", "song,podcast");
        }
    }
}
