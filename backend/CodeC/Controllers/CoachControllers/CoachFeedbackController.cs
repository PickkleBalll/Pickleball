using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Services;

namespace MyApp.Controllers.CoachControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachFeedbackController : ControllerBase
    {
        private readonly CoachFeedbackService _service;

        public CoachFeedbackController(CoachFeedbackService service)
        {
            _service = service;
        }

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

        [HttpGet("by-coach/{coachId}")]
        [Authorize(Roles = "Coach,Admin")]
        public async Task<IActionResult> GetFeedbacksByCoach(string coachId)
        {
            var feedbacks = await _service.GetFeedbacksByCoach(coachId);
            return Ok(feedbacks);
        }
    }
}
