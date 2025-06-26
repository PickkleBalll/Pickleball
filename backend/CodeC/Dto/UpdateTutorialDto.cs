namespace MyApp.Dto
{
    public class UpdateTutorialDto
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public string? VideoUrl { get; set; }
    }

}
