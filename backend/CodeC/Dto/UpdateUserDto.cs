using System.ComponentModel.DataAnnotations;

namespace MyApp.Dto
{
    public class UpdateUserDto
    {
        public string Id { get; set; } = default!;

        [Required]
        public string Fullname { get; set; } = default!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;

        public string? PhoneNumber { get; set; }

        public string? Role { get; set; }

        public bool IsVerified { get; set; }

        // Không required
        public string? PasswordHash { get; set; }
    }
}
