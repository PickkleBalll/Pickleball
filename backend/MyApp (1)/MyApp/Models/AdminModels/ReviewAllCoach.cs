using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models.admin_login
{
    public class ReviewAllCoach
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required(ErrorMessage = "CoachId is required.")]
        public string CoachId { get; set; } = string.Empty; // Huấn luyện viên được đánh giá

        [Required(ErrorMessage = "ReviewerId is required.")]
        public string ReviewerId { get; set; } = string.Empty;     // Người đánh giá (user)

        [Required(ErrorMessage = "Rating is required.")]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }

        [Required(ErrorMessage = "Comment is required.")]
        public string Comment { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

