namespace pickleball.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public int CoachId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string CourseName { get; set; } = string.Empty;  
        public CoachProfile Coach { get; set; }
    }
}