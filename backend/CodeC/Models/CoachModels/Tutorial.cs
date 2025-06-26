using coach.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models.coach
{
    public class Tutorial
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Title { get; set; } = default!;

        public string? Description { get; set; }

        public string? VideoUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string CoachId { get; set; } = default!;

        [ForeignKey("CoachId")]
        public CoachProfile Coach { get; set; } = default!;
    }
}
