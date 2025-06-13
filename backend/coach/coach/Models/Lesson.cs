namespace coach.Models
{
    public class Lesson
    {
        public int Id { get; set; }

        public required string CourseName { get; set; }  
        public int NumberOfSessions { get; set; }
        public int CoachProfileId { get; set; }

        public required CoachProfile CoachProfile { get; set; }  
    }
}
