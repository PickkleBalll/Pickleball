using MyApp.Models.admin_login;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace coach.Models
{
    public class CoachProfile
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        public string UserId { get; set; } = string.Empty;

        [ForeignKey("UserId")]
        public Admin User { get; set; } = default!;
        public required string FullName { get; set; } = string.Empty;
        public required string Specialty { get; set; } = string.Empty;
        public required string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty; // "Male", "Female", "Other"...

        public DateTime DateOfBirth { get; set; } 
        public bool IsVerified { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}