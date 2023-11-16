using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace backend.Controllers
{
	[Route("api/student")]
	[ApiController]
	public class StudentsController : ControllerBase
	{
		[HttpGet]
		[Route("get-student-list")]
		public IActionResult GetStudentsList()
		{
			List<Student> students = new List<Student>();
			
			// get student list from database
				students.Add(new Student { StudentId = 1, StudentName = "Pathum", Email = "pathum@gmail.com" });
				students.Add(new Student { StudentId = 2, StudentName = "Michelle", Email = "michelle@gmail.com" });
				students.Add(new Student { StudentId = 3, StudentName = "Sanduni", Email = "sanduni@gmail.com" });

			// Return the list of students as JSON in the response
			return Ok(students);
		}

		[HttpPost]
		[Route("create-student")]
		public IActionResult CreateStudent(Student student)
		{

			if (student == null || String.IsNullOrWhiteSpace(student.StudentName) || String.IsNullOrWhiteSpace(student.Email))
			{
				return BadRequest();
			}

			

			List<Student> students = new List<Student>();
			
				students.Add(new Student { StudentId = 1, StudentName = "Pathum", Email = "pathum@gmail.com" });
				students.Add(new Student { StudentId = 2, StudentName = "Michelle", Email = "michelle@gmail.com" });
				students.Add(new Student { StudentId = 3, StudentName = "Sanduni", Email = "sanduni@gmail.com" });
				students.Add(student);

			

			// Return the list of students as JSON in the response
			return Ok(students);
		}

		[HttpGet]
		[Route("get-student-by-id/{StudentId}")]
		public IActionResult GetStudentsById(int StudentId)
		{
			List<Student> students = new List<Student>();
	
				students.Add(new Student { StudentId = 1, StudentName = "Pathum", Email = "pathum@gmail.com" });
				students.Add(new Student { StudentId = 2, StudentName = "Michelle", Email = "michelle@gmail.com" });
				students.Add(new Student { StudentId = 3, StudentName = "Sanduni", Email = "sanduni@gmail.com" });

			var student = students.Where(x => x.StudentId == StudentId).FirstOrDefault();

			// Return the list of students as JSON in the response
			return Ok(student);
		}

		[HttpPost]
		[Route("update-student")]
		public IActionResult UpdateStudent(Student student)
		{

			if (student == null || String.IsNullOrWhiteSpace(student.StudentName) || String.IsNullOrWhiteSpace(student.Email) || student.StudentId < 1)
			{
				return BadRequest();
			}



			List<Student> students = new List<Student>();

			students.Add(new Student { StudentId = 1, StudentName = "Pathum", Email = "pathum@gmail.com" });
			students.Add(new Student { StudentId = 2, StudentName = "Michelle", Email = "michelle@gmail.com" });
			students.Add(new Student { StudentId = 3, StudentName = "Sanduni", Email = "sanduni@gmail.com" });
			students.Add(student);



			// Return the list of students as JSON in the response
			return Ok(students);
		}


	}
}
