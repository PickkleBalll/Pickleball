using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;
using MyApp.Models.coach;
using System.Security.Claims;

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

    // ✅ Create tutorial
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

        // ✅ Get all tutorials by coach
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tutorials = await _context.Tutorials.ToListAsync();
        return Ok(tutorials);
    }


    // ✅ Update tutorial
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateTutorialDto dto)
    {
        var tutorial = await _context.Tutorials.FirstOrDefaultAsync(t => t.Id == id);

        if (tutorial == null)
            return NotFound("Không tìm thấy tutorial.");

        tutorial.Title = dto.Title;
        tutorial.Description = dto.Description;
        tutorial.VideoUrl = dto.VideoUrl;

        await _context.SaveChangesAsync();
        return Ok(tutorial);
    }


    // ✅ Delete tutorial
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var tutorial = await _context.Tutorials.FirstOrDefaultAsync(t => t.Id == id);

        if (tutorial == null)
            return NotFound("Tutorial not found or you don't have permission.");

        _context.Tutorials.Remove(tutorial);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Tutorial deleted successfully" });
    }
}
