using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PickleballCourseAPI.Models
{
    public class Course
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string CoachId { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public string? Bio { get; set; }
        
        public string? Content { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        
        public string ListMember { get; set; } = "[]"; // JSON string of user IDs
        
        public int MaxStudents { get; set; } = 20;
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public CourseStatus Status { get; set; } = CourseStatus.Active;
        
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("CoachId")]
        public virtual User Coach { get; set; }
        
        public virtual ICollection<Bill> Bills { get; set; } = new List<Bill>();
    }
    
    public enum CourseStatus
    {
        Active = 0,
        Inactive = 1,
        Completed = 2,
        Cancelled = 3
    }
}