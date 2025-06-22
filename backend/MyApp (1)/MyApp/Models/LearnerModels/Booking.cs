using coach.Models;

namespace MyApp.Models.learneR

{
    public class Booking
    {
        public string Id { get; set; }
        public string LearnerId { get; set; }
        public Learner Learner { get; set; } = default!;
        public string CourseName { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
        public bool IsPaid { get; set; } = false;
        public int CoachId { get; set; }
        // Thêm navigation đến Payment
        public List<Payment> Payments { get; set; } = new();
        public int CourseId { get; set; }
//lien ket bang khoa hoc
        public string LessonId { get; set; } = string.Empty;
    public Lesson Lesson { get; set; } = default!;

    // Liên kết với bảng Coach
    public string CoachProfileId { get; set; } = string.Empty;
    public CoachProfile CoachProfile { get; set; } = default!;

    }
}
