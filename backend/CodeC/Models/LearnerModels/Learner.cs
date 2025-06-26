using MyApp.Models.admin_login;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models.learneR

{
    [Table("Learners")]
    public class Learner
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        public string UserId { get; set; } = default!;

        [ForeignKey("UserId")]
        public Admin User { get; set; } = default!;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool IsVerified { get; set; }
      
    }
}
