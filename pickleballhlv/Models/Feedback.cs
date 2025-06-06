using System;
namespace pickleball.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string Content { get; set; }
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}