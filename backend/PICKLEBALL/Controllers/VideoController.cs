using Microsoft.AspNetCore.Mvc;
using PICKLEBALL.Model;
using PICKLEBALL.Data;
namespace PICKLEBALL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoController:ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public VideoController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo([FromForm] IFormFile file, [FromForm] int userId, [FromForm] string? description)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is missing.");

            var uploads = Path.Combine(_environment.WebRootPath ?? "wwwroot", "videos");
            if (!Directory.Exists(uploads))
                Directory.CreateDirectory(uploads);

            var filePath = Path.Combine(uploads, Guid.NewGuid() + Path.GetExtension(file.FileName));

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var video = new Video
            {
                UserId = userId,
                FilePath = filePath,
                Description = description
            };

            _context.Videos.Add(video);
            await _context.SaveChangesAsync();

            return Ok(video);
        }
    }
}
