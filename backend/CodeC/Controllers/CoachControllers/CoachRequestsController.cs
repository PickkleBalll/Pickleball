using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Services;

namespace MyApp.Controllers.CoachControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachRequestsController : ControllerBase
    {
        private readonly CoachRequestService _service;

        public CoachRequestsController(CoachRequestService service)
        {
            _service = service;
        }

        [HttpPost]
        [Authorize(Roles = "Learner")]
        public async Task<IActionResult> SubmitRequest([FromBody] CreateCoachRequestDto dto)
        {
            var result = await _service.SubmitRequestAsync(dto);
            return Ok(new { message = "Gửi yêu cầu thành công", data = result });
        }

        [HttpGet("pending")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPendingRequests()
        {
            var requests = await _service.GetPendingRequestsAsync();
            return Ok(requests);
        }

        [HttpPost("approve/{requestId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ApproveRequest(string requestId)
        {
            var result = await _service.ApproveRequestAsync(requestId);
            return Ok(new { message = "Đã duyệt thành công" });
        }
    }
}
