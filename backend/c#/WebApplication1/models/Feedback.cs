using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PickleballCourseAPI.Models
{
    public class Feedback
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string UserId { get; set; }
        
        [Required]
        public string CoachId { get; set; }
        
        [Required]
        public string Content { get; set; }
        
        public int Rating { get; set; } // 1-5 stars
        
        public string? CourseId { get; set; }
        
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        
        [ForeignKey("CoachId")]
        public virtual User Coach { get; set; }
        
        [ForeignKey("CourseId")]
        public virtual Course? Course { get; set; }
    }
}