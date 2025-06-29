using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Services;

namespace MyApp.Controllers.LearnerControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LearnerVideoController : ControllerBase
    {
        private readonly VideoService _videoService;

        public LearnerVideoController(VideoService videoService)
        {
            _videoService = videoService;
        }

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

        // Lấy video của learner
        [HttpGet("learner/{learnerId}")]
        public async Task<IActionResult> GetVideos(string learnerId)
        {
            var result = await _videoService.GetVideosByLearner(learnerId);
            return Ok(result);
        }
    }
}
