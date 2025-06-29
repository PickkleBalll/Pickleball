using Microsoft.AspNetCore.Mvc;
using MyApp.Models.learneR;
using MyApp.Data;
namespace MyApp.Controllers

{
    [ApiController]
    [Route("api/Feedbacks")]
    public class LearnerFeedbackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LearnerFeedbackController(ApplicationDbContext context)
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
        public IActionResult GetUserFeedback(string userId)
        {
            var feedbacks = _context.Feedbacks.Where(f => f.UserId == userId).ToList();
            //code đúng so sánh userId không so sánh Fbid so voi userID?? --> var feedbacks = _context.Feedbacks.Where(f => f.UserId == userId).ToList();

            return Ok(feedbacks);
    }
        }

    }
