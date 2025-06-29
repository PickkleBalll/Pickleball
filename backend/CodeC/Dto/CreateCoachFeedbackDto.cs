namespace MyApp.Dto
{
    public class CreateCoachFeedbackDto
    {
        public string LearnerId { get; set; }
        public string CoachId { get; set; }
        public string CourseId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }

}
