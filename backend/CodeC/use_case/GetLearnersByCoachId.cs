using MyApp.Data;
using MyApp.Models.learneR;
using Microsoft.EntityFrameworkCore;
namespace MyApp.use_case
{
    public class GetLearnersByCoachId
    {
        private readonly ApplicationDbContext _context;

        public GetLearnersByCoachId(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Learner>> ExecuteAsync(string coachId)
        {
            var learnerIds = await _context.Bookings
                .Where(b => b.CoachId == coachId)
                .Select(b => b.LearnerId) // Đây chính là Learner.Id
                .Distinct()
                .ToListAsync();

            var learners = await _context.Learners
                .Where(l => learnerIds.Contains(l.Id)) // 🟢 So sánh với Id
                .Include(l => l.User)
                .ToListAsync();

            return learners;
        }
    }
}
