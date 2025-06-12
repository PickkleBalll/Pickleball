using Microsoft.AspNetCore.Mvc;
using PICKLEBALL.Model;
using PICKLEBALL.Data;
namespace PICKLEBALL.Controllers

{
    [ApiController]
    [Route("api/Feedbacks")]
    public class FeedbackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedbackController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitFeedback([FromBody] Feedbacks feedback)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return Ok(feedback);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUserFeedback(int userId)
        {
            var feedbacks = _context.Feedbacks.Where(f => f.UserId == userId).ToList();
            return Ok(feedbacks);
        }
    }
    }
