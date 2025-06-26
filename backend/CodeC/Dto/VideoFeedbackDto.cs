namespace MyApp.Dto
{
    public class VideoFeedbackDto
    {
        public string VideoId { get; set; } = default!;
        public string CoachId { get; set; } = default!;
        public string Comment { get; set; } = string.Empty;
    }

}
