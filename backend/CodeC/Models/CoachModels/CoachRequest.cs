using MyApp.Models.learneR;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models.CoachModels
{
    public class CoachRequest
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string LearnerId { get; set; } = default!;

        [ForeignKey("LearnerId")]
        public Learner Learner { get; set; } = default!;

        public string Reason { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsApproved { get; set; } = false;
    }
}
