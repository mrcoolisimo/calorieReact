using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FoodCrud2.Models;

namespace FoodCrud2.Data
{
    public class FoodCrud2Context : DbContext
    {
        public FoodCrud2Context (DbContextOptions<FoodCrud2Context> options)
            : base(options)
        {
        }

        public DbSet<FoodCrud2.Models.Food> Food { get; set; }

        public DbSet<FoodCrud2.Models.DayTotal> DayTotal { get; set; }
    }
}
