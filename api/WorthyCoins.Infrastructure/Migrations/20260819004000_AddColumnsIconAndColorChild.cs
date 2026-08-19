using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorthyCoins.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnsIconAndColorChild : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Child",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "Child",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Child");

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "Child");
        }
    }
}
