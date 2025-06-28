using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PickleballCourseAPI.Models
{
    public class Upload
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string UserId { get; set; }
        
        [Required]
        public string VideoUrl { get; set; }
        
        public string? FileName { get; set; }
        
        public long FileSize { get; set; }
        
        public string? Description { get; set; }
        
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        
        public virtual ICollection<Analysis> Analyses { get; set; } = new List<Analysis>();
    }
}