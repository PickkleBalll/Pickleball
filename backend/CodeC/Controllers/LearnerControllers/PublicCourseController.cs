using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;

[ApiController]
[Route("api/[controller]")]
public class PublicCourseController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PublicCourseController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("coaches")]
    public async Task<IActionResult> GetAllCoaches()
    {
        var coaches = await _context.CoachProfiles
            .Select(c => new
            {
                c.Id,
                c.FullName,
                c.Email,
                c.PhoneNumber,
                c.Gender,
                c.DateOfBirth,
                c.Specialty,
                c.IsVerified,
                c.CreatedAt
            }).ToListAsync();
        return Ok(coaches);
    }

    [HttpGet("courses")]
    public async Task<IActionResult> GetAllCoursesWithCoach()
    {
        var courses = await _context.CoursePackages
            .Include(c => c.Coach)
            .Select(c => new
            {
                c.PackageId,
                c.Title,
                c.Description,
                c.Price,
                c.ImageUrl,
                Coach = new
                {
                    c.Coach.Id,
                    c.Coach.FullName
                }
            })
            .ToListAsync();

        return Ok(courses);
    }

    [HttpGet("coach/{coachId}/courses")]
    public async Task<IActionResult> GetCoursesByCoach(string coachId)
    {
        var courses = await _context.CoursePackages
            .Where(c => c.CoachId == coachId)
            .Select(c => new
            {
                c.PackageId,
                c.Title,
                c.Description,
                c.Price,
                c.ImageUrl
            })
            .ToListAsync();

        return Ok(courses);
    }
}
