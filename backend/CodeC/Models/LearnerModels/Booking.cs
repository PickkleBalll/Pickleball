using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using coach.Models;

namespace MyApp.Models.learneR
{
    public class Booking
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string LearnerId { get; set; }

        public Learner Learner { get; set; } = default!;

        [Required]
        public string CourseId { get; set; }

        [ForeignKey("CourseId")]
        public CoursePackage Course { get; set; } = default!;

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        public bool IsPaid { get; set; } = false;

        public string? CoachId { get; set; }

        [ForeignKey("CoachId")]
        public CoachProfile? CoachProfile { get; set; }

        public List<Payment> Payments { get; set; } = new();

        // ✅ Bổ sung cho chức năng admin trả tiền coach
        public bool CoachPaid { get; set; } = false;

        public DateTime? CoachPaidAt { get; set; }

        public decimal? CoachAmountPaid { get; set; }
    }
}
