using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
	[Route("api/student")]
	[ApiController]
	public class StudentsController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public StudentsController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("get-student-list")]
		public async Task<IActionResult> GetStudentsList()
		{
			List<Student> students = await _context.Students.ToListAsync();
			return Ok(students);
		}

		[HttpPost]
		[Route("create-student")]
		public async Task<IActionResult> CreateStudent(Student student)
		{
			if (student == null || string.IsNullOrWhiteSpace(student.StudentName) || string.IsNullOrWhiteSpace(student.Email))
			{
				return BadRequest();
			}

			_context.Students.Add(student);
			await _context.SaveChangesAsync();

			return Ok(student);
		}

		[HttpGet]
		[Route("get-student-by-id/{StudentId}")]
		public async Task<IActionResult> GetStudentsById(int StudentId)
		{
			var student = await _context.Students.FirstOrDefaultAsync(x => x.StudentId == StudentId);

			if (student == null)
			{
				return NotFound();
			}

			return Ok(student);
		}

		[HttpPut]
		[Route("update-student")]
		public async Task<IActionResult> UpdateStudent(Student student)
		{
			if (student == null || string.IsNullOrWhiteSpace(student.StudentName) || string.IsNullOrWhiteSpace(student.Email) || student.StudentId < 1)
			{
				return BadRequest();
			}

			_context.Entry(student).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!_context.Students.Any(s => s.StudentId == student.StudentId))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return Ok(student);
		}

		[HttpDelete]
		[Route("delete-student/{studentId}")]
		public async Task<IActionResult> DeleteStudent(int studentId)
		{
			var student = await _context.Students.FirstOrDefaultAsync(x => x.StudentId == studentId);

			if (student == null)
			{
				return NotFound();
			}

			_context.Students.Remove(student);
			await _context.SaveChangesAsync();

			return Ok(student);
		}

	}
}
