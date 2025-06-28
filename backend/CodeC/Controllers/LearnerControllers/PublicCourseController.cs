using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;

/// <summary>
/// API công khai cung cấp danh sách huấn luyện viên và các khóa học (public access).
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PublicCourseController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PublicCourseController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Lấy danh sách tất cả huấn luyện viên trong hệ thống.
    /// </summary>
    /// <returns>Danh sách các huấn luyện viên với thông tin cơ bản</returns>
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

    /// <summary>
    /// Lấy danh sách tất cả các khóa học, kèm thông tin huấn luyện viên giảng dạy.
    /// </summary>
    /// <returns>Danh sách các khóa học với thông tin huấn luyện viên</returns>
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

    /// <summary>
    /// Lấy danh sách các khóa học do một huấn luyện viên cụ thể giảng dạy.
    /// </summary>
    /// <param name="coachId">ID của huấn luyện viên</param>
    /// <returns>Danh sách các khóa học của huấn luyện viên đó</returns>
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
