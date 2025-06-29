namespace MyApp.Dto
{
    public class CreateTutorialDto
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public string? VideoUrl { get; set; }
    }
}
