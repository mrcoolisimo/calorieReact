﻿// <auto-generated />
using System;
using FoodCrud2.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FoodCrud2.Migrations
{
    [DbContext(typeof(FoodCrud2Context))]
    partial class FoodCrud2ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FoodCrud2.Models.DayTotal", b =>
                {
                    b.Property<int>("DayTotalID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RealDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TotalCarbs")
                        .HasColumnType("int");

                    b.Property<int>("TotalFats")
                        .HasColumnType("int");

                    b.Property<int>("TotalProtein")
                        .HasColumnType("int");

                    b.HasKey("DayTotalID");

                    b.ToTable("DayTotal");
                });

            modelBuilder.Entity("FoodCrud2.Models.Food", b =>
                {
                    b.Property<int>("FoodID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Carbs")
                        .HasColumnType("int");

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Fats")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Protein")
                        .HasColumnType("int");

                    b.Property<DateTime>("RealDate")
                        .HasColumnType("datetime2");

                    b.HasKey("FoodID");

                    b.ToTable("Food");
                });
#pragma warning restore 612, 618
        }
    }
}
