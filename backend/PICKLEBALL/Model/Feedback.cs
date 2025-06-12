namespace PICKLEBALL.Model
{
    public class Feedbacks
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; } // nếu có khóa học
        public string Content { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
