using Microsoft.AspNetCore.Mvc;
using MyApp.Models.learneR;
using MyApp.Data;
namespace MyApp.Controllers

{
    /// <summary>
    /// API để học viên gửi phản hồi và xem lại phản hồi của chính mình.
    /// </summary>
    [ApiController]
    [Route("api/Feedbacks")]
    public class LearnerFeedbackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LearnerFeedbackController(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Học viên gửi phản hồi về hệ thống hoặc trải nghiệm học tập.
        /// </summary>
        /// <param name="feedback">Thông tin phản hồi: nội dung, ngày gửi, người gửi...</param>
        /// <returns>Trả về phản hồi vừa được lưu</returns>
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitFeedback([FromBody] Feedbacks feedback)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return Ok(feedback);
        }
        /// <summary>
        /// Lấy tất cả phản hồi của một người dùng theo UserId.
        /// </summary>
        /// <param name="userId">ID của người dùng (Admin, Coach hoặc Learner)</param>
        /// <returns>Danh sách các phản hồi đã gửi</returns>
        /// <remarks>
        /// So sánh chính xác `UserId` từ bảng Feedbacks với tham số truyền vào, không phải `FeedbackId`.
        /// </remarks>
        [HttpGet("user/{userId}")]
        public IActionResult GetUserFeedback(string userId)
        {
            var feedbacks = _context.Feedbacks.Where(f => f.UserId == userId).ToList();
            //code đúng so sánh userId không so sánh Fbid so voi userID?? --> var feedbacks = _context.Feedbacks.Where(f => f.UserId == userId).ToList();

            return Ok(feedbacks);
    }
        }

    }
