using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Services;

namespace MyApp.Controllers.CoachControllers
{
    /// <summary>
    /// API xử lý yêu cầu của học viên gửi đến huấn luyện viên và duyệt yêu cầu bởi Admin.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CoachRequestsController : ControllerBase
    {
        private readonly CoachRequestService _service;

        public CoachRequestsController(CoachRequestService service)
        {
            _service = service;
        }
        /// <summary>
        /// Học viên gửi yêu cầu học với huấn luyện viên.
        /// </summary>
        /// <param name="dto">Thông tin yêu cầu gồm: LearnerId, CoachId, nội dung yêu cầu,...</param>
        /// <returns>Thông báo thành công và dữ liệu yêu cầu đã gửi</returns>
        /// <remarks>Chỉ role "Learner" mới được phép gọi API này.</remarks>
        [HttpPost]
        [Authorize(Roles = "Learner")]
        public async Task<IActionResult> SubmitRequest([FromBody] CreateCoachRequestDto dto)
        {
            var result = await _service.SubmitRequestAsync(dto);
            return Ok(new { message = "Gửi yêu cầu thành công", data = result });
        }
        /// <summary>
        /// Lấy danh sách các yêu cầu chờ duyệt (pending).
        /// </summary>
        /// <returns>Danh sách các yêu cầu đang chờ duyệt bởi Admin</returns>
        /// <remarks>Chỉ role "Admin" có quyền xem danh sách này.</remarks>
        [HttpGet("pending")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPendingRequests()
        {
            var requests = await _service.GetPendingRequestsAsync();
            return Ok(requests);
        }
        /// <summary>
        /// Duyệt một yêu cầu học viên gửi đến huấn luyện viên.
        /// </summary>
        /// <param name="requestId">ID của yêu cầu cần được duyệt</param>
        /// <returns>Thông báo duyệt thành công</returns>
        /// <remarks>Chỉ Admin có quyền duyệt yêu cầu.</remarks>
        [HttpPost("approve/{requestId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ApproveRequest(string requestId)
        {
            var result = await _service.ApproveRequestAsync(requestId);
            return Ok(new { message = "Đã duyệt thành công" });
        }
    }
}
