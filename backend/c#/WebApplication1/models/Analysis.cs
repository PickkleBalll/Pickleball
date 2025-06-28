using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PickleballCourseAPI.Models
{
    public class Analysis
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string UploadId { get; set; }
        
        [Required]
        public string Content { get; set; }
        
        public string? CoachId { get; set; }
        
        public int Rating { get; set; } // 1-5 stars
        
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("UploadId")]
        public virtual Upload Upload { get; set; }
        
        [ForeignKey("CoachId")]
        public virtual User? Coach { get; set; }
    }
}