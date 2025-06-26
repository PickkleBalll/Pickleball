using coach.Models;
using MyApp.Models.learneR;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models.LearnerModels
{
    public class VideoFeedback
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string VideoId { get; set; }

        [ForeignKey("VideoId")]
        public Video Video { get; set; } = default!;

        [Required]
        public string CoachId { get; set; }

        [ForeignKey("CoachId")]
        public CoachProfile Coach { get; set; } = default!;

        [Required]
        public string Comment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
