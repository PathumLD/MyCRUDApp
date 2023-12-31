﻿using backend.Database;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace backend.Controllers
{
	[Route("api/users")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

		[HttpGet("authenticate")]
		public IActionResult Authenticate()
		{

			var claims = new[]
			{
				new Claim("Authorized by", "Pathum Lakshan"),
				new Claim(JwtRegisteredClaimNames.Sub, "user_id")
			};

			var keyBytes = Encoding.UTF8.GetBytes(Constants.Secret);

			var key = new SymmetricSecurityKey(keyBytes);

			var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				Constants.Audience,
				Constants.Issuer,
				claims,
				notBefore: DateTime.Now,
				expires: DateTime.Now.AddMinutes(10),
				signingCredentials
				);

			var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
			return Ok(new { accessToken = tokenString});
		}


		[HttpPost]
		[Route("signup")]
		public async Task<IActionResult> Signup(Users user)
		{
			try
			{
				if (user == null || string.IsNullOrWhiteSpace(user.UserName) || string.IsNullOrWhiteSpace(user.UserEmail) || string.IsNullOrWhiteSpace(user.Password))
				{
					return BadRequest("Invalid user data");
				}

				// Check if the user already exists (based on email or any unique identifier)
				var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserEmail == user.UserEmail);

				if (existingUser != null)
				{
					return Conflict("User already exists");
				}

				// Create a new user entity
				var newUser = new Users
				{
					UserName = user.UserName,
					UserEmail = user.UserEmail,
					Password = user.Password, // Note: Consider using proper password hashing
					Phone = user.Phone						 // Add other properties as per your User model
				};

				// Add the new user to the database
				_context.Users.Add(newUser);
				await _context.SaveChangesAsync();

				return CreatedAtAction(nameof(Signup), newUser); // Return the newly created user
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating user: {ex.Message}");
			}
		}



		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> Login(Users user)
		{
			try
			{
				if (user == null || string.IsNullOrWhiteSpace(user.UserEmail) || string.IsNullOrWhiteSpace(user.Password))
				{
					return BadRequest("Invalid request");
				}

				var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserEmail == user.UserEmail);

				if (existingUser == null || existingUser.Password != user.Password)
				{
					return Unauthorized("Invalid credentials");
				}

				// Authentication successful
				return Ok(existingUser); // Return the authenticated user data
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, $"Error during login: {ex.Message}");
			}
		}


		[HttpGet]
		[Route("get-users-list")]
		[Authorize]
		public async Task<IActionResult> GetUsersList()
		{
			try
			{
				List<Users> users = await _context.Users.ToListAsync();
				return Ok(users);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving users: {ex.Message}");
			}
		}


		[HttpPost]
		[Route("create-user")]
		public async Task<IActionResult> CreateUser(Users users)
		{
			try
			{
				if (users == null || string.IsNullOrWhiteSpace(users.UserName) || string.IsNullOrWhiteSpace(users.UserEmail))
				{
					return BadRequest();
				}

				_context.Users.Add(users);
				await _context.SaveChangesAsync();

				return Ok(users);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating user: {ex.Message}");
			}
		}


		[HttpGet]
		[Route("get-user-by-id/{UserId}")]
		public async Task<IActionResult> GetUserById(int UserId)
		{
			try
			{
				var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == UserId);

				if (user == null)
				{
					return NotFound();
				}

				return Ok(user);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving user by ID: {ex.Message}");
			}
		}


		[HttpPut]
		[Route("update-user")]
		public async Task<IActionResult> UpdateUser(Users users)
		{
			if (users == null || string.IsNullOrWhiteSpace(users.UserName) || string.IsNullOrWhiteSpace(users.UserEmail) || users.UserId < 1)
			{
				return BadRequest();
			}

			_context.Entry(users).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!_context.Users.Any(s => s.UserId == users.UserId))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return Ok(users);
		}


		[HttpDelete]
		[Route("delete-user/{userId}")]
		public async Task<IActionResult> DeleteUser(int userId)
		{
			var users = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);

			if (users == null)
			{
				return NotFound();
			}

			_context.Users.Remove(users);
			await _context.SaveChangesAsync();

			return Ok(users);
		}



	}
}
