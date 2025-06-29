using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PickleballCourseAPI.Models;
using PickleballCourseAPI.Services;
using System.Security.Claims;

namespace PickleballCourseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly IUploadService _uploadService;

        public UploadController(IUploadService uploadService)
        {
            _uploadService = uploadService;
        }

        /// <summary>
        /// Học viên hoặc huấn luyện viên upload video
        /// </summary>
        [HttpPost("upload")]
        [Authorize(Roles = "Student,Coach")]
        public async Task<IActionResult> UploadVideo([FromForm] IFormFile file, [FromForm] string? description)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Vui lòng chọn file video." });

            var userId = User.FindFirstValue("userId");

            try
            {
                var result = await _uploadService.CreateUploadAsync(userId, file, description);
                return Ok(new { message = "Tải video thành công", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Lỗi upload", error = ex.Message });
            }
        }

        /// <summary>
        /// Học viên hoặc huấn luyện viên xem các video mình đã upload
        /// </summary>
        [HttpGet("my")]
        [Authorize(Roles = "Student,Coach")]
        public async Task<IActionResult> GetMyUploads()
        {
            var userId = User.FindFirstValue("userId");
            var uploads = await _uploadService.GetUploadsByUserAsync(userId);
            return Ok(uploads);
        }

        /// <summary>
        /// Xem thông tin chi tiết một video cụ thể theo Id
        /// </summary>
        [HttpGet("{id}")]
        [Authorize(Roles = "Student,Coach,Admin")]
        public async Task<IActionResult> GetById(string id)
        {
            var upload = await _uploadService.GetUploadByIdAsync(id);
            if (upload == null)
                return NotFound(new { message = "Không tìm thấy video." });

            var currentUserId = User.FindFirstValue("userId");
            var isAdmin = User.IsInRole("Admin");

            if (upload.UserId != currentUserId && !isAdmin)
                return Forbid();

            return Ok(upload);
        }
    }
}
