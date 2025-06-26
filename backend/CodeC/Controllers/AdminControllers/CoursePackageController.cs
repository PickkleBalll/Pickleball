using coach.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class CoursePackageController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CoursePackageController(ApplicationDbContext context)
    {
        _context = context;
    }

    //  Lấy tất cả khóa học kèm thông tin coach
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CoursePackage>>> GetAll()
    {
        var list = await _context.CoursePackages
            .Include(cp => cp.Coach)
            .ToListAsync();

        return Ok(list);
    }

    //  Lấy 1 khóa học theo ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var course = await _context.CoursePackages
            .Include(cp => cp.Coach)
            .FirstOrDefaultAsync(cp => cp.PackageId == id);

        if (course == null) return NotFound("Course not found.");
        return Ok(course);
    }

    //  Tạo khóa học mới (có Coach)
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCoursePackageDto dto)
    {
        var coach = await _context.CoachProfiles.FindAsync(dto.CoachId);
        if (coach == null)
            return BadRequest("CoachId không tồn tại.");

        var package = new CoursePackage
        {
            PackageId = Guid.NewGuid().ToString(),
            Title = dto.Title,
            Price = dto.Price,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            CreatedAt = DateTime.UtcNow,
            CoachId = dto.CoachId
        };

        _context.CoursePackages.Add(package);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Tạo khóa học thành công", data = package });
    }


    //  Cập nhật khóa học
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] CoursePackage updated)
    {
        var course = await _context.CoursePackages.FindAsync(id);
        if (course == null) return NotFound("Course không tồn tại.");

        // Check coach mới nếu có
        if (!string.IsNullOrWhiteSpace(updated.CoachId))
        {
            var coach = await _context.CoachProfiles.FindAsync(updated.CoachId);
            if (coach == null) return BadRequest("CoachId không hợp lệ.");
            course.CoachId = updated.CoachId;
        }

        course.Title = updated.Title;
        course.Price = updated.Price;
        course.Description = updated.Description;
        course.ImageUrl = updated.ImageUrl;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Cập nhật thành công", data = course });
    }

    //  Xóa khóa học
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var course = await _context.CoursePackages.FindAsync(id);
        if (course == null) return NotFound("Course không tồn tại.");

        _context.CoursePackages.Remove(course);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Xóa khóa học thành công." });
    }
}
