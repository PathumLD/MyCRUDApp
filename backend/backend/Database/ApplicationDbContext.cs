using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
	public class ApplicationDbContext : DbContext
	{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

		public DbSet<Student> Students { get; set; }
	}
}
