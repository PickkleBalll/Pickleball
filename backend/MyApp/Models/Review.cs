using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models
{
    public class Review
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "CoachId is required.")]
        public Guid CoachId { get; set; } // Huấn luyện viên được đánh giá

        [Required(ErrorMessage = "ReviewerId is required.")]
        public Guid ReviewerId { get; set; } // Người đánh giá (user)

        [Required(ErrorMessage = "Rating is required.")]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }

        [Required(ErrorMessage = "Comment is required.")]
        public string Comment { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

