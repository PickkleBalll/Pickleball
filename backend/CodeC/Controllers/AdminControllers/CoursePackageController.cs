using coach.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
/// <summary>
/// admin tạo gói học
/// </summary>
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

    /// <summary>
    /// Lấy danh sách tất cả các gói học, bao gồm thông tin huấn luyện viên liên quan.
    /// </summary>
    /// <returns>Danh sách các khóa học có huấn luyện viên</returns>
    //  Lấy tất cả khóa học kèm thông tin coach
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CoursePackage>>> GetAll()
    {
        var list = await _context.CoursePackages
            .Include(cp => cp.Coach)
            .ToListAsync();

        return Ok(list);
    }
    /// <summary>
    /// Lấy thông tin một gói học cụ thể theo ID.
    /// </summary>
    /// <param name="id">ID của gói học</param>
    /// <returns>Chi tiết gói học nếu tìm thấy</returns>
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
    /// <summary>
    /// Tạo một gói học mới, có liên kết với huấn luyện viên.
    /// </summary>
    /// <param name="dto">Thông tin gói học cần tạo</param>
    /// <returns>Thông báo thành công và thông tin gói học vừa tạo</returns>
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

    /// <summary>
    /// Cập nhật thông tin một gói học theo ID.
    /// </summary>
    /// <param name="id">ID của gói học cần cập nhật</param>
    /// <param name="updated">Dữ liệu mới của gói học</param>
    /// <returns>Thông báo nếu cập nhật thành công</returns>
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
    /// <summary>
    /// Xóa một gói học khỏi hệ thống.
    /// </summary>
    /// <param name="id">ID của gói học cần xóa</param>
    /// <returns>Thông báo nếu xóa thành công</returns>
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
