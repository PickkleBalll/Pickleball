using Microsoft.AspNetCore.Mvc;
using coach.Data;
using coach.Models;
using coach.use_case.Feedbacks;
using System.Threading.Tasks;

namespace coach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly SubmitFeedback _submitFeedback;

        public FeedbackController(AppDbContext context)
        {
            _submitFeedback = new SubmitFeedback(context);
        }

        [HttpPost]
        public async Task<ActionResult<Feedback>> Submit([FromBody] Feedback feedback)
        {
            var result = await _submitFeedback.ExecuteAsync(feedback);
            return CreatedAtAction(nameof(Submit), new { id = result.Id }, result);
        }
    }
}