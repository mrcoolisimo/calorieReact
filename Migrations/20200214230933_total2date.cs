using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodCrud2.Migrations
{
    public partial class total2date : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Date",
                table: "DayTotal",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "DayTotal");
        }
    }
}
