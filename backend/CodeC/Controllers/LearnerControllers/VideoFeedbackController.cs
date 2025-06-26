using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Services;

namespace MyApp.Controllers.LearnerControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoFeedbackController : ControllerBase
    {
        private readonly VideoFeedbackService _feedbackService;

        public VideoFeedbackController(VideoFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

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

        // Lấy tất cả feedback của video
        [HttpGet("video/{videoId}")]
        public async Task<IActionResult> GetFeedbacks(string videoId)
        {
            var result = await _feedbackService.GetFeedbacksByVideo(videoId);
            return Ok(result);
        }
    }
}
