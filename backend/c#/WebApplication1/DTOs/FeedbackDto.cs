using System.ComponentModel.DataAnnotations;

namespace PickleballCourseAPI.DTOs
{
    public class FeedbackDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public string CoachId { get; set; }
        public string CoachEmail { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public string? CourseId { get; set; }
        public string? CourseName { get; set; }
        public DateTime CreateAt { get; set; }
    }
    
    public class CreateFeedbackDto
    {
        [Required]
        public string CoachId { get; set; }
        
        [Required]
        public string Content { get; set; }
        
        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }
        
        public string? CourseId { get; set; }
    }
}