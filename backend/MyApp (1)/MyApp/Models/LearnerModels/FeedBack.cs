namespace MyApp.Models.learneR
{
    public class Feedbacks
    {
        public int Id { get; set; }

        public int UserId { get; set; } // Id của người viết (có thể là coach hoặc learner)
        public string UserRole { get; set; } = "Learner"; // hoặc "Coach"

        public string Content { get; set; } = string.Empty;

        public int? LessonId { get; set; } // nếu viết feedback cho 1 bài học
        public int? CourseId { get; set; } // nếu viết feedback cho 1 khóa học

        public DateTime Date { get; set; } = DateTime.Now;
    }
}
