using System;
using System.ComponentModel.DataAnnotations;

namespace MyApp.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Fullname { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "User"; // User / Admin / Coach

        public bool IsVerified { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? VerifiedAt { get; set; }
    }
}


