using System.ComponentModel.DataAnnotations;

namespace MyApp.Models.learneR
{
    public class Feedbacks
    {
        [Key]
        public string FeedbackId { get; set; } = Guid.NewGuid().ToString();


        public string UserId { get; set; } // Id của người viết (có thể là coach hoặc learner)
        public string UserRole { get; set; } = "Learner"; // hoặc "Coach"

        public string Content { get; set; } = string.Empty;

        //public int? LessonId { get; set; } // nếu viết feedback cho 1 bài học( t đ rõ 2 này) 
        //public int? CourseId { get; set; } // nếu viết feedback cho 1 khóa học

        public DateTime Date { get; set; } = DateTime.Now;
    }
}
