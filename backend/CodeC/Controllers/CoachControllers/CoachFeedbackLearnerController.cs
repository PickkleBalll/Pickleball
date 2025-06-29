using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;

namespace MyApp.Controllers.coach
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoachFeedbackLearnerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoachFeedbackLearnerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Coach gửi feedback cho learner
        [HttpPost("{coachId}/feedback")]
        public async Task<IActionResult> GiveFeedback(string coachId, [FromBody] CoachFeedbackDto dto)
        {
            var feedback = new CoachFeedback
            {
                Id = Guid.NewGuid().ToString(),
                CoachId = coachId,
                LearnerId = dto.LearnerId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.CoachFeedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(feedback);
        }

        // Lấy feedback theo learner
        [HttpGet("learner/{learnerId}")]
        public async Task<IActionResult> GetFeedbacksForLearner(string learnerId)
        {
            var feedbacks = await _context.CoachFeedbacks
                .Where(f => f.LearnerId == learnerId)
                .ToListAsync();

            return Ok(feedbacks);
        }
    }
}
