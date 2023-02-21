using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Haly.WebApp.Migrations
{
    public partial class RefactorUserPlaylistRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Playlists_Users_UserId",
                table: "Playlists");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Playlists_PlaylistId_UserId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_PlaylistId_UserId",
                table: "Tracks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Playlists",
                table: "Playlists");

            migrationBuilder.DropIndex(
                name: "IX_Playlists_UserId",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Playlists");

            migrationBuilder.AddColumn<List<string>>(
                name: "LinkedPlaylistsOrder",
                table: "Users",
                type: "jsonb",
                nullable: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Playlists",
                table: "Playlists",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_PlaylistId",
                table: "Tracks",
                column: "PlaylistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Playlists_PlaylistId",
                table: "Tracks",
                column: "PlaylistId",
                principalTable: "Playlists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Playlists_PlaylistId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_PlaylistId",
                table: "Tracks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Playlists",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "LinkedPlaylistsOrder",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Tracks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Playlists",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Playlists",
                table: "Playlists",
                columns: new[] { "Id", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_PlaylistId_UserId",
                table: "Tracks",
                columns: new[] { "PlaylistId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Playlists_UserId",
                table: "Playlists",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Playlists_Users_UserId",
                table: "Playlists",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Playlists_PlaylistId_UserId",
                table: "Tracks",
                columns: new[] { "PlaylistId", "UserId" },
                principalTable: "Playlists",
                principalColumns: new[] { "Id", "UserId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
