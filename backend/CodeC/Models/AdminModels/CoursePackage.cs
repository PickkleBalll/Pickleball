using coach.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class CoursePackage
{
    [Key]
    public string PackageId { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string Title { get; set; }

    [Required]
    public decimal Price { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // ✅ Liên kết với CoachProfile
    [Required]
    public string? CoachId { get; set; }

    [ForeignKey("CoachId")]
    public CoachProfile Coach { get; set; } = default!;
}
