using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;

namespace MyApp.Controllers
{
    /// <summary>
    /// API xử lý thông báo của người dùng: xem danh sách và đánh dấu đã đọc.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotificationController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy tất cả thông báo của một người dùng cụ thể.
        /// </summary>
        /// <param name="userId">ID người dùng cần lấy thông báo</param>
        /// <returns>Danh sách thông báo theo thứ tự mới nhất</returns>
        // Lấy tất cả thông báo của user
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserNotifications(string userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    CreatedAt = n.CreatedAt,
                    IsRead = n.IsRead
                })
                .ToListAsync();

            return Ok(notifications);
        }

        /// <summary>
        /// Đánh dấu một thông báo là đã đọc.
        /// </summary>
        /// <param name="id">ID của thông báo cần đánh dấu</param>
        /// <returns>Trạng thái NoContent nếu thành công</returns>
        // Đánh dấu đã đọc
        [HttpPut("markread/{id}")]
        public async Task<IActionResult> MarkAsRead(string id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null) return NotFound();

            notification.IsRead = true;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
