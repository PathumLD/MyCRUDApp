using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class Users
	{
		[Key]
		public int UserId { get; set; }
		public string UserName { get; set; } = string.Empty;
		public string UserEmail { get; set; } = string.Empty;
		public string Password { get; set; } = string.Empty;
		public string Phone { get; set; } = string.Empty;

	}
}
