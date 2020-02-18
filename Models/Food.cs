using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodCrud2.Models
{
	public class Food
	{
		public int FoodID { get; set; }
		public string Name { get; set; }
		public int Fats { get; set; }
		public int Carbs { get; set; }
		public int Protein { get; set; }
		public string Date { get; set; }
	}
}
