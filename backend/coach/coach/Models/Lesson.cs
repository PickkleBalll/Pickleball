namespace coach.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public int NumberOfSessions { get; set; }
        public int CoachProfileId { get; set; }
        public CoachProfile CoachProfile { get; set; }
    }
}