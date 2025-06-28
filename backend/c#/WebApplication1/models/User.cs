using System.ComponentModel.DataAnnotations;

namespace PickleballCourseAPI.Models
{
    public class User
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required]
        public UserRole Role { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public string? Phone { get; set; }
        
        public string? EmailContact { get; set; }
        
        public string? Bio { get; set; }
        
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual ICollection<Course> CoursesAsCoach { get; set; } = new List<Course>();
        public virtual ICollection<Bill> Bills { get; set; } = new List<Bill>();
        public virtual ICollection<Feedback> FeedbacksGiven { get; set; } = new List<Feedback>();
        public virtual ICollection<Feedback> FeedbacksReceived { get; set; } = new List<Feedback>();
        public virtual ICollection<Upload> Uploads { get; set; } = new List<Upload>();
    }
    
    public enum UserRole
    {
        Student = 0,
        Coach = 1,
        Admin = 2
    }
}