using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodCrud2.Migrations
{
    public partial class total2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DayTotal",
                columns: table => new
                {
                    DayTotalID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalFats = table.Column<int>(nullable: false),
                    TotalCarbs = table.Column<int>(nullable: false),
                    TotalProtein = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DayTotal", x => x.DayTotalID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DayTotal");
        }
    }
}
