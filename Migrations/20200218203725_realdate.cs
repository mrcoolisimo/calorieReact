using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodCrud2.Migrations
{
    public partial class realdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "RealDate",
                table: "DayTotal",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RealDate",
                table: "DayTotal");
        }
    }
}
