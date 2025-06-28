using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Services;

namespace MyApp.Controllers.LearnerControllers
{
    /// <summary>
    /// API xử lý phản hồi (feedback) của huấn luyện viên đối với video học viên tải lên.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class VideoFeedbackController : ControllerBase
    {
        private readonly VideoFeedbackService _feedbackService;

        public VideoFeedbackController(VideoFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        /// <summary>
        /// Huấn luyện viên gửi nhận xét (feedback) cho video của học viên.
        /// </summary>
        /// <param name="dto">Dữ liệu phản hồi bao gồm VideoId, CoachId, nội dung...</param>
        /// <returns>Thông báo và dữ liệu phản hồi vừa tạo</returns>
        // Coach gửi feedback
        [HttpPost("add")]
        public async Task<IActionResult> AddFeedback([FromBody] VideoFeedbackDto dto)
        {
            try
            {
                var result = await _feedbackService.AddFeedbackAsync(dto);
                return Ok(new { message = "Đã gửi feedback", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    inner = ex.InnerException?.Message
                });
            }
        }

        /// <summary>
        /// Lấy danh sách tất cả phản hồi của một video cụ thể.
        /// </summary>
        /// <param name="videoId">ID của video</param>
        /// <returns>Danh sách phản hồi</returns>
        // Lấy tất cả feedback của video
        [HttpGet("video/{videoId}")]
        public async Task<IActionResult> GetFeedbacks(string videoId)
        {
            var result = await _feedbackService.GetFeedbacksByVideo(videoId);
            return Ok(result);
        }
    }
}
