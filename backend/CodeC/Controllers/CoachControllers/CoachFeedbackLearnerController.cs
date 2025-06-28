using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;

namespace MyApp.Controllers.coach
{
    /// <summary>
    /// API cho phép huấn luyện viên gửi và xem đánh giá dành cho học viên.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CoachFeedbackLearnerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoachFeedbackLearnerController(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Huấn luyện viên gửi đánh giá cho một học viên.
        /// </summary>
        /// <param name="coachId">ID của huấn luyện viên gửi đánh giá</param>
        /// <param name="dto">Dữ liệu đánh giá bao gồm: LearnerId, Rating, Comment</param>
        /// <returns>
        /// Trả về thông tin đánh giá vừa được tạo.
        /// </returns>
        // Coach gửi feedback cho learner
        [HttpPost("{coachId}/feedback")]
        public async Task<IActionResult> GiveFeedback(string coachId, [FromBody] CoachFeedbackDto dto)
        {
            var feedback = new CoachFeedback
            {
                Id = Guid.NewGuid().ToString(),
                CoachId = coachId,
                LearnerId = dto.LearnerId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.CoachFeedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(feedback);
        }
        /// <summary>
        /// Lấy danh sách feedback từ các huấn luyện viên dành cho một học viên.
        /// </summary>
        /// <param name="learnerId">ID của học viên cần xem feedback</param>
        /// <returns>
        /// Trả về danh sách feedback của học viên.
        /// </returns>
        // Lấy feedback theo learner
        [HttpGet("learner/{learnerId}")]
        public async Task<IActionResult> GetFeedbacksForLearner(string learnerId)
        {
            var feedbacks = await _context.CoachFeedbacks
                .Where(f => f.LearnerId == learnerId)
                .ToListAsync();

            return Ok(feedbacks);
        }
    }
}
