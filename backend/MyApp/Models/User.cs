using System;
using System.ComponentModel.DataAnnotations;

namespace MyApp.Models
{
    public class User
    {
        [Key] // Khóa chính
        public Guid Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "User";
    }
}
