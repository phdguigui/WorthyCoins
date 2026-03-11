using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorthyCoins.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RelationBetweenUserAndParent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Parent");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Parent",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Parent_UserId",
                table: "Parent",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Parent_Users_UserId",
                table: "Parent",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parent_Users_UserId",
                table: "Parent");

            migrationBuilder.DropIndex(
                name: "IX_Parent_UserId",
                table: "Parent");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Parent");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Parent",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }
    }
}
