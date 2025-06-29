using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PickleballCourseAPI.Data;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.Services
{
    public class UploadService : IUploadService
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public UploadService(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<Upload> CreateUploadAsync(string userId, IFormFile file, string? description)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new Exception("User not found");

            // Tạo thư mục nếu chưa tồn tại
            var uploadFolder = Path.Combine(_environment.WebRootPath, "videos");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            // Tạo đường dẫn file duy nhất
            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var upload = new Upload
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                FileName = file.FileName,
                FileSize = file.Length,
                Description = description,
                VideoUrl = $"/videos/{fileName}",
                CreateAt = DateTime.UtcNow
            };

            _context.Uploads.Add(upload);
            await _context.SaveChangesAsync();

            return upload;
        }

        public async Task<IEnumerable<Upload>> GetUploadsByUserAsync(string userId)
        {
            return await _context.Uploads
                .Where(u => u.UserId == userId)
                .Include(u => u.User)
                .OrderByDescending(u => u.CreateAt)
                .ToListAsync();
        }

        public async Task<Upload?> GetUploadByIdAsync(string id)
        {
            return await _context.Uploads
                .Include(u => u.User)
                .Include(u => u.Analyses)
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
