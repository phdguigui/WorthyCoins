using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorthyCoins.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnStatusUserTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCanceled",
                table: "UserTask");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "UserTask");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "UserTask",
                type: "integer",
                nullable: false,
                defaultValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "UserTask");

            migrationBuilder.AddColumn<bool>(
                name: "IsCanceled",
                table: "UserTask",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "UserTask",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
