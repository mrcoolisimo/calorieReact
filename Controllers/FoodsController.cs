using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodCrud2.Data;
using FoodCrud2.Models;

namespace FoodCrud2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly FoodCrud2Context _context;

        public FoodsController(FoodCrud2Context context)
        {
            _context = context;
        }
        [BindProperty]
        public DayTotal DayTotal { get; set; }


        // GET: api/Foods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Food>>> GetFood(int num)
        {
            // var dateTime = DateTime.UtcNow.Date;
            // return await _context.Food.Where(f => f.Date == dateTime.ToString("dd/MM/yyyy")).ToListAsync();
                var dateTime = DateTime.UtcNow.Date.AddDays(num).AddHours(-8);
                return await _context.Food.Where(f => f.Date == dateTime.ToString("dd/MM/yyyy")).ToListAsync();
        }

        // GET: api/Foods/5
        /*[HttpGet("{id}")]
        public async Task<ActionResult<Food>> GetFood(int id)
        {
            var food = await _context.Food.FindAsync(id);

            if (food == null)
            {
                return NotFound();
            }

            return food;
        }*/

        // PUT: api/Foods/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFood(int id, Food food)
        {
            if (id != food.FoodID)
            {
                return BadRequest();
            }

            var f00d = await _context.Food.AsNoTracking().FirstOrDefaultAsync(f => f.FoodID == id);
            var dayTotal = await _context.DayTotal.FirstOrDefaultAsync(d => d.Date == food.Date);

            //If the entry is empty and we didnt give a blank food
            if (dayTotal == null &&
                food.Carbs + food.Fats + food.Protein != 0)
            {
                DayTotal.TotalCarbs = food.Carbs;
                DayTotal.TotalFats = food.Fats;
                DayTotal.TotalProtein = food.Protein;
                DayTotal.Date = food.Date;
                DayTotal.RealDate = food.RealDate;
                _context.DayTotal.Add(DayTotal);
            }
            //if the entry exists and we didnt give it a blank food
            if (dayTotal != null)
            {
                dayTotal.TotalCarbs += food.Carbs - f00d.Carbs;
                dayTotal.TotalFats += food.Fats - f00d.Fats;
                dayTotal.TotalProtein += food.Protein - f00d.Protein;
                dayTotal.Date = food.Date;

                if (dayTotal.TotalCarbs +
                   dayTotal.TotalFats +
                   dayTotal.TotalProtein == 0)
                {
                    _context.DayTotal.Remove(dayTotal);
                }
                else
                {
                    _context.Attach(dayTotal).State = EntityState.Modified;
                }
         
            }
            if (dayTotal != null &&
               food.Carbs + food.Fats + food.Protein == 0)
            {
                _context.DayTotal.Remove(dayTotal);
            }

            _context.Entry(food).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Foods
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Food>> PostFood(Food food, int num)
        {
            var dateTime = DateTime.UtcNow.Date.AddDays(num+1).AddHours(-8);
            food.Date = DateTime.UtcNow.Date.AddDays(num+1).AddHours(-8).ToString("dd/MM/yyyy");
            food.RealDate = dateTime;

            //DayTotal = await _context.DayTotal.FirstOrDefaultAsync(d => d.DayTotalID == 1);
            var dayTotal = await _context.DayTotal.FirstOrDefaultAsync(d => d.Date == food.Date);
            if (dayTotal == null)
            {
                DayTotal.TotalCarbs = food.Carbs;
                DayTotal.TotalFats = food.Fats;
                DayTotal.TotalProtein = food.Protein;
                DayTotal.Date = food.Date;
                DayTotal.RealDate = dateTime;
                _context.DayTotal.Add(DayTotal);
            }
            else
            {
                dayTotal.TotalCarbs += food.Carbs;
                dayTotal.TotalFats += food.Fats;
                dayTotal.TotalProtein += food.Protein;
                dayTotal.Date = food.Date;
                dayTotal.RealDate = dateTime;
                _context.Attach(dayTotal).State = EntityState.Modified;
            }
            
            _context.Food.Add(food);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFood", new { id = food.FoodID }, food);
        }

        // DELETE: api/Foods/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Food>> DeleteFood(int id)
        {
            var food = await _context.Food.FindAsync(id);
            if (food == null)
            {
                return NotFound();
            }

            var dayTotal = await _context.DayTotal.FirstOrDefaultAsync(d => d.Date == food.Date);
            dayTotal.TotalCarbs -= food.Carbs;
            dayTotal.TotalFats -= food.Fats;
            dayTotal.TotalProtein -= food.Protein;
            dayTotal.Date = food.Date;
            
            if (dayTotal.TotalCarbs +
                dayTotal.TotalFats +
                dayTotal.TotalProtein == 0)
            {
                _context.DayTotal.Remove(dayTotal);
            }
            else
            {
                _context.Attach(dayTotal).State = EntityState.Modified;
            }

            _context.Food.Remove(food);
            await _context.SaveChangesAsync();

            return food;
        }

        private bool FoodExists(int id)
        {
            return _context.Food.Any(e => e.FoodID == id);
        }
    }
}
