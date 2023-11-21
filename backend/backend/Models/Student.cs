using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class Student
	{
		[Key]
		public int StudentId { get; set; }
		public string? StudentName { get; set;}
		public string? Email { get; set;}
	}
}
