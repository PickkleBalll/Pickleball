using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Services;

namespace MyApp.Controllers.LearnerControllers
{
    /// <summary>
    /// API dành cho học viên để tải lên video và xem danh sách video đã tải.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class LearnerVideoController : ControllerBase
    {
        private readonly VideoService _videoService;

        public LearnerVideoController(VideoService videoService)
        {
            _videoService = videoService;
        }

        /// <summary>
        /// Học viên tải lên một video để lưu trữ hoặc phân tích.
        /// </summary>
        /// <param name="dto">Dữ liệu bao gồm file video (.mp4) và thông tin liên quan</param>
        /// <returns>Thông báo và thông tin video sau khi tải thành công</returns>
        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo([FromForm] UploadVideoDto dto)
        {
            try
            {
                var result = await _videoService.UploadVideoAsync(dto); 
                return Ok(new { message = "Tải video thành công", data = result });
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
        /// Lấy danh sách các video đã tải của một học viên.
        /// </summary>
        /// <param name="learnerId">ID của học viên</param>
        /// <returns>Danh sách các video tương ứng</returns>
        // Lấy video của learner
        [HttpGet("learner/{learnerId}")]
        public async Task<IActionResult> GetVideos(string learnerId)
        {
            var result = await _videoService.GetVideosByLearner(learnerId);
            return Ok(result);
        }
    }
}
