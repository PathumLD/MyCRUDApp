﻿using System.ComponentModel.DataAnnotations;

namespace backend.Models.Authentication.SignUp
{
	public class RegisterUser
	{
		[Required(ErrorMessage = "Username is required")]
		public string? Username { get; set; }

		[Required(ErrorMessage = "Email is required")]
		public string? Email { get; set; }

		[Required(ErrorMessage = "Password is required")] 
		public string? Password { get; set; }
	}
}
