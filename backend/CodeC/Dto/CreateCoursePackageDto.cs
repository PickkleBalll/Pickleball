namespace MyApp.Dto
{
    public class CreateCoursePackageDto
    {
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public string CoachId { get; set; } = default!;
    }

}
