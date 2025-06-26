namespace MyApp.Dto
{
    public class UploadVideoDto
    {
        public string LearnerId { get; set; } = string.Empty;
        public IFormFile File { get; set; } // This will hold your uploaded file
        public string Description { get; set; }
    }

}
