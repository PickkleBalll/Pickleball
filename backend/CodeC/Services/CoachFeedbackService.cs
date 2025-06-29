using MyApp.Data;
using MyApp.Dto;
using Microsoft.EntityFrameworkCore;
namespace MyApp.Services
{
    public class CoachFeedbackService
    {
        private readonly ApplicationDbContext _context;

        public CoachFeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CoachFeedback> SubmitFeedback(CreateCoachFeedbackDto dto)
        {
            var learner = await _context.Learners.FindAsync(dto.LearnerId)
                ?? throw new Exception("Learner không tồn tại.");

            var course = await _context.CoursePackages.FindAsync(dto.CourseId)
                ?? throw new Exception("Khóa học không tồn tại.");

            if (course.CoachId != dto.CoachId)
                throw new Exception("Coach không thuộc khóa học này.");

            var booking = await _context.Bookings
                .FirstOrDefaultAsync(b => b.LearnerId == dto.LearnerId && b.CourseId == dto.CourseId);

            if (booking == null)
                throw new Exception("Bạn chưa đăng ký khóa học này.");

            var feedback = new CoachFeedback
            {
                Id = Guid.NewGuid().ToString(),
                LearnerId = dto.LearnerId,
                CoachId = dto.CoachId,
                CourseId = dto.CourseId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.CoachFeedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return feedback;
        }

        public async Task<List<CoachFeedback>> GetFeedbacksByCoach(string coachId)
        {
            return await _context.CoachFeedbacks
                .Where(f => f.CoachId == coachId)
                .Include(f => f.Learner)
                .Include(f => f.Course)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
        }
    }

}
