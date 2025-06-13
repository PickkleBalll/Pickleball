;
using coach.Models;

namespace coach.use_case.Feedbacks
{
    public class SubmitFeedback
    {
        private readonly AppDbContext _context;

        public SubmitFeedback(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Feedback> ExecuteAsync(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return feedback;
        }
    }
}
