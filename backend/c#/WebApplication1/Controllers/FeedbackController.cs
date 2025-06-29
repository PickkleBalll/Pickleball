using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PickleballCourseAPI.DTOs;
using PickleballCourseAPI.Services;
using System.Security.Claims;

namespace PickleballCourseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        /// <summary>
        /// Admin xem tất cả feedback từ tất cả người dùng
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllFeedbacks()
        {
            var feedbacks = await _feedbackService.GetAllFeedbacksAsync();
            return Ok(feedbacks);
        }

        /// <summary>
        /// Học viên gửi feedback cho coach
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> CreateFeedback([FromBody] CreateFeedbackDto dto)
        {
            var userId = User.FindFirstValue("userId");

            try
            {
                var result = await _feedbackService.CreateFeedbackAsync(userId, dto);
                return Ok(new { message = "Đã gửi feedback", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Coach xem feedback mà học viên đã gửi cho mình
        /// </summary>
        [HttpGet("coach")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetFeedbacksForCoach()
        {
            var coachId = User.FindFirstValue("userId");
            var feedbacks = await _feedbackService.GetFeedbacksByCoachAsync(coachId);
            return Ok(feedbacks);
        }

        /// <summary>
        /// Học viên xem các feedback mình đã gửi
        /// </summary>
        [HttpGet("my")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetFeedbacksByUser()
        {
            var userId = User.FindFirstValue("userId");
            var feedbacks = await _feedbackService.GetFeedbacksByUserAsync(userId);
            return Ok(feedbacks);
        }
    }
}
