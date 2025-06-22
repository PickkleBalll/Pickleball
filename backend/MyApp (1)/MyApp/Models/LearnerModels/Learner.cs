using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models.learneR

{
    [Table("Learners")]
    public class Learner
    {
        public string? Id { get; set; } = string.Empty; //ID ?
       
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool IsVerified { get; set; }
        public bool IsActive { get; set; }
    }
}
