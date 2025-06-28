using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Services;

namespace MyApp.Controllers.CoachControllers
{   /// <summary>
    /// API cho phép học viên gửi feedback cho huấn luyện viên và cho phép huấn luyện viên xem các feedback đã nhận.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CoachFeedbackController : ControllerBase
    {
        private readonly CoachFeedbackService _service;

        public CoachFeedbackController(CoachFeedbackService service)
        {
            _service = service;
        }
        /// <summary>
        /// Học viên gửi đánh giá cho huấn luyện viên.
        /// </summary>
        /// <param name="dto">Dữ liệu đánh giá bao gồm: CoachId, điểm đánh giá, bình luận,...</param>
        /// <returns>
        /// Trả về thông báo nếu gửi thành công hoặc lỗi nếu có vấn đề.
        /// </returns>
        /// <remarks>
        /// Endpoint này yêu cầu role là "Learner".
        /// </remarks>
        [HttpPost]
        [Authorize(Roles = "Learner")]
        public async Task<IActionResult> SubmitFeedback([FromBody] CreateCoachFeedbackDto dto)
        {
            try
            {
                var result = await _service.SubmitFeedback(dto);
                return Ok(new { message = "Gửi feedback thành công", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        /// <summary>
        /// Lấy danh sách đánh giá dành cho một huấn luyện viên cụ thể.
        /// </summary>
        /// <param name="coachId">ID của huấn luyện viên</param>
        /// <returns>
        /// Trả về danh sách các feedback của học viên cho huấn luyện viên đó.
        /// </returns>
        /// <remarks>
        /// Endpoint này cho phép truy cập bởi huấn luyện viên hoặc quản trị viên.
        /// </remarks>
        [HttpGet("by-coach/{coachId}")]
        [Authorize(Roles = "Coach,Admin")]
        public async Task<IActionResult> GetFeedbacksByCoach(string coachId)
        {
            var feedbacks = await _service.GetFeedbacksByCoach(coachId);
            return Ok(feedbacks);
        }
    }
}
