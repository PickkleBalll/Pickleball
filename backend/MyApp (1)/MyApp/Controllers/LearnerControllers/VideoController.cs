
//using Microsoft.AspNetCore.Mvc;
//using MyApp.Models.learneR;
//using MyApp.Data;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.EntityFrameworkCore;
//using System.IO;

//namespace MyApp.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class VideoController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;
//        private readonly IWebHostEnvironment _environment;

//        public VideoController(ApplicationDbContext context, IWebHostEnvironment environment)
//        {
//            _context = context;
//            _environment = environment;
//        }

//        [HttpPost("upload")]
//        public async Task<IActionResult> UploadVideo([FromForm] IFormFile file, [FromForm] int userId, [FromForm] string? description)
//        {
//            if (file == null || file.Length == 0)
//                return BadRequest("File is missing.");

//            // Tạo thư mục lưu video nếu chưa có
//            var uploadsFolder = Path.Combine(_environment.WebRootPath ?? "wwwroot", "videos");
//            if (!Directory.Exists(uploadsFolder))
//                Directory.CreateDirectory(uploadsFolder);

//            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
//            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

//            // Lưu file vào hệ thống
//            using (var stream = new FileStream(filePath, FileMode.Create))
//            {
//                await file.CopyToAsync(stream);
//            }

//            // Tạo bản ghi Video
//            var video = new Video
//            {
//                UserId = userId,
//                FilePath = "/videos/" + uniqueFileName, // Lưu đường dẫn tương đối cho frontend dễ dùng
//                Description = description,
//                UploadDate = DateTime.UtcNow
//            };

//            _context.Videos.Add(video);
//            await _context.SaveChangesAsync();

//            return Ok(video);
//        }
//    }
//}
