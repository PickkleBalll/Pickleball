using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;
using MyApp.Models.coach;
using System.Security.Claims;

/// <summary>
/// API dành cho huấn luyện viên để quản lý video hướng dẫn (tutorial).
/// </summary>
[Authorize(Roles = "Coach")]
[ApiController]
[Route("api/[controller]")]
public class TutorialController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TutorialController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Tạo mới một video hướng dẫn.
    /// </summary>
    /// <param name="dto">Thông tin video hướng dẫn cần tạo</param>
    /// <returns>Thông báo và dữ liệu tutorial vừa tạo</returns>
    //  Create tutorial
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTutorialDto dto)
    {
        try
        {
            // Lấy UserId từ token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            // Tìm CoachProfile tương ứng với UserId
            var coach = await _context.CoachProfiles
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (coach == null)
                return NotFound(new { message = "Không tìm thấy hồ sơ huấn luyện viên." });

            var tutorial = new Tutorial
            {
                Id = Guid.NewGuid().ToString(),
                Title = dto.Title,
                Description = dto.Description,
                VideoUrl = dto.VideoUrl,
                CoachId = coach.Id, // dùng CoachProfile.Id
                CreatedAt = DateTime.UtcNow
            };

            _context.Tutorials.Add(tutorial);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Tạo tutorial thành công", data = tutorial });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message,
                inner = ex.InnerException?.Message,
                deeper = ex.InnerException?.InnerException?.Message
            });
        }
    }

    /// <summary>
    /// Lấy danh sách tất cả video hướng dẫn do huấn luyện viên hiện tại đăng tải.
    /// </summary>
    /// <returns>Danh sách tutorial của chính huấn luyện viên đó</returns>
    //  Get all tutorials by coach
    [HttpGet]
    public async Task<IActionResult> GetOwn()
    {
        var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var tutorials = await _context.Tutorials
            .Where(t => t.CoachId == coachId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return Ok(tutorials);
    }

    /// <summary>
    /// Cập nhật thông tin video hướng dẫn.
    /// </summary>
    /// <param name="id">ID của tutorial cần cập nhật</param>
    /// <param name="dto">Thông tin mới: tiêu đề, mô tả, video URL</param>
    /// <returns>Thông tin tutorial sau khi cập nhật</returns>
    //  Update tutorial
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateTutorialDto dto)
    {
        var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var tutorial = await _context.Tutorials.FirstOrDefaultAsync(t => t.Id == id && t.CoachId == coachId);

        if (tutorial == null)
            return NotFound("Tutorial not found or you don't have permission.");

        tutorial.Title = dto.Title;
        tutorial.Description = dto.Description;
        tutorial.VideoUrl = dto.VideoUrl;

        await _context.SaveChangesAsync();
        return Ok(tutorial);
    }

    /// <summary>
    /// Xóa một video hướng dẫn.
    /// </summary>
    /// <param name="id">ID của tutorial cần xóa</param>
    /// <returns>Thông báo xóa thành công</returns>
    //  Delete tutorial
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var tutorial = await _context.Tutorials.FirstOrDefaultAsync(t => t.Id == id && t.CoachId == coachId);

        if (tutorial == null)
            return NotFound("Tutorial not found or you don't have permission.");

        _context.Tutorials.Remove(tutorial);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Tutorial deleted successfully" });
    }
}
