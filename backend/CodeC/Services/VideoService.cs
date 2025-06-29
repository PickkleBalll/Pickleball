using MyApp.Data;
using MyApp.Dto;
using MyApp.Models;
using MyApp.Models.learneR; // Corrected namespace as per your code
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http; // Add this using directive
using System.IO; // Add this for file operations

namespace MyApp.Services
{
    public class VideoService
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment; // Add this for accessing wwwroot or content root

        // Inject IWebHostEnvironment
        public VideoService(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<Video> UploadVideoAsync(UploadVideoDto dto)
        {
            if (dto.File == null || dto.File.Length == 0)
            {
                throw new Exception("Không có tệp video nào được tải lên."); // No video file uploaded
            }

            var learner = await _context.Learners
    .FirstOrDefaultAsync(l => l.UserId == dto.LearnerId);

            if (learner == null)
                throw new Exception("Học viên không tồn tại"); 

            var uploadsFolder = Path.Combine(_webHostEnvironment.ContentRootPath, "Uploads", "Videos");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + dto.File.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.File.CopyToAsync(stream);
            }

            // Construct the path that will be saved in the database
            // This could be a relative path or a full URL if uploaded to cloud storage
            // For local storage, you might want to save a relative path
            var dbFilePath = Path.Combine("Uploads", "Videos", uniqueFileName).Replace("\\", "/"); // Store with forward slashes for URL consistency

            // 2. Create the Video entity and save its metadata
            var video = new Video
            {
                Id = Guid.NewGuid().ToString(),
                UserId = learner.Id, // <-- Sửa lại ở đây
                FilePath = dbFilePath,
                Description = dto.Description,
                UploadDate = DateTime.UtcNow
            };

            _context.Videos.Add(video);

            // Gửi thông báo cho admin/coach
            var admins = await _context.Admins.ToListAsync();
            foreach (var admin in admins)
            {
                _context.Notifications.Add(new Notification
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = admin.Id,
                    Role = "Admin",
                    Title = "Video mới từ học viên", // New video from learner
                    Message = $"Học viên {learner.FullName} đã tải lên 1 video mới để được đánh giá." // Learner {FullName} has uploaded a new video for review.
                });
            }

            await _context.SaveChangesAsync();
            return video;
        }

        public async Task<List<Video>> GetVideosByLearner(string learnerId)
        {
            return await _context.Videos
                .Where(v => v.UserId == learnerId)
                .OrderByDescending(v => v.UploadDate)
                .ToListAsync();
        }
    }
}