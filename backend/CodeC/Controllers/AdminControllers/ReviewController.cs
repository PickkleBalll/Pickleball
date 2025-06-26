using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using MyApp.Models.admin_login;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace MyApp.Controllers.admin_login
{
    [ApiController]
    [Route("api")]
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách đánh giá (review) theo huấn luyện viên.
        /// </summary>
        /// <param name="coachId">ID của huấn luyện viên</param>
        /// <returns>Danh sách đánh giá với tên người đánh giá</returns>
        [HttpGet("coaches/{coachId}/reviews")]
        [ProducesResponseType(typeof(IEnumerable<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetReviewsByCoach(string coachId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.CoachId == coachId)   
                .Join(_context.Admins, r => r.ReviewerId, u => u.Id, (r, u) => new
                {
                    r.Id,
                    r.Rating,
                    r.Comment,
                    r.CreatedAt,
                    ReviewerName = u.Fullname
                })
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(reviews);
        }

        /// <summary>
        /// Gửi đánh giá cho huấn luyện viên.
        /// </summary>
        /// <remarks>
        /// Người dùng phải đăng nhập (vai trò "User") và truyền coachId, rating (1-5), comment.
        /// </remarks>
        /// <param name="request">Thông tin đánh giá</param>
        /// <returns>Thông báo thành công</returns>
        [HttpPost("reviews")]
        [Authorize(Roles = "User")]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> CreateReview([FromBody] ReviewRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Missing user ID in token");

            var coach = await _context.Admins.FindAsync(request.CoachId);
            if (coach == null || coach.Role != "Coach")
                return BadRequest("Invalid CoachId");

            var review = new ReviewAllCoach
            {
                Id = Guid.NewGuid().ToString(),
                CoachId = request.CoachId.ToString(),
                ReviewerId = Guid.Parse(userId).ToString(),
                Rating = request.Rating,
                Comment = request.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Review submitted successfully." });
        }
    }

    /// <summary>
    /// Yêu cầu gửi đánh giá huấn luyện viên.
    /// </summary>
    public class ReviewRequest
    {
        [Required]
        public Guid CoachId { get; set; }

        [Required]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }

        [Required]
        public string Comment { get; set; } = string.Empty;
    }
}
    

