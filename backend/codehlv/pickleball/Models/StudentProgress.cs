namespace pickleball.Models
{
    public class StudentProgress
    {
        public int Id { get; set; }
        public int StudentId { get; set; }  
        public string StudentName { get; set; }
        public string ProgressNote { get; set; }
        public DateTime Date { get; set; }
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
    }
}