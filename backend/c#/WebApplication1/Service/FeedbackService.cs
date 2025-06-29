using Microsoft.EntityFrameworkCore;
using PickleballCourseAPI.Data;
using PickleballCourseAPI.DTOs;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly ApplicationDbContext _context;

        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FeedbackDto>> GetAllFeedbacksAsync()
        {
            var feedbacks = await _context.Feedbacks
                .Include(f => f.User)
                .Include(f => f.Coach)
                .Include(f => f.Course)
                .ToListAsync();

            return feedbacks.Select(f => new FeedbackDto
            {
                Id = f.Id,
                UserId = f.UserId,
                UserEmail = f.User.Email,
                CoachId = f.CoachId,
                CoachEmail = f.Coach.Email,
                Content = f.Content,
                Rating = f.Rating,
                CourseId = f.CourseId,
                CourseName = f.Course?.Name,
                CreateAt = f.CreateAt
            });
        }

        public async Task<FeedbackDto> CreateFeedbackAsync(string userId, CreateFeedbackDto dto)
        {
            var user = await _context.Users.FindAsync(userId);
            var coach = await _context.Users.FindAsync(dto.CoachId);

            if (user == null) throw new Exception("User not found.");
            if (coach == null) throw new Exception("Coach not found.");

            var feedback = new Feedback
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                CoachId = dto.CoachId,
                Content = dto.Content,
                Rating = dto.Rating,
                CourseId = dto.CourseId,
                CreateAt = DateTime.UtcNow
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return new FeedbackDto
            {
                Id = feedback.Id,
                UserId = userId,
                UserEmail = user.Email,
                CoachId = coach.Id,
                CoachEmail = coach.Email,
                Content = feedback.Content,
                Rating = feedback.Rating,
                CourseId = feedback.CourseId,
                CourseName = feedback.CourseId != null
                    ? (await _context.Courses.FindAsync(feedback.CourseId))?.Name
                    : null,
                CreateAt = feedback.CreateAt
            };
        }

        public async Task<IEnumerable<FeedbackDto>> GetFeedbacksByCoachAsync(string coachId)
        {
            var feedbacks = await _context.Feedbacks
                .Where(f => f.CoachId == coachId)
                .Include(f => f.User)
                .Include(f => f.Coach)
                .Include(f => f.Course)
                .ToListAsync();

            return feedbacks.Select(f => new FeedbackDto
            {
                Id = f.Id,
                UserId = f.UserId,
                UserEmail = f.User.Email,
                CoachId = f.CoachId,
                CoachEmail = f.Coach.Email,
                Content = f.Content,
                Rating = f.Rating,
                CourseId = f.CourseId,
                CourseName = f.Course?.Name,
                CreateAt = f.CreateAt
            });
        }

        public async Task<IEnumerable<FeedbackDto>> GetFeedbacksByUserAsync(string userId)
        {
            var feedbacks = await _context.Feedbacks
                .Where(f => f.UserId == userId)
                .Include(f => f.User)
                .Include(f => f.Coach)
                .Include(f => f.Course)
                .ToListAsync();

            return feedbacks.Select(f => new FeedbackDto
            {
                Id = f.Id,
                UserId = f.UserId,
                UserEmail = f.User.Email,
                CoachId = f.CoachId,
                CoachEmail = f.Coach.Email,
                Content = f.Content,
                Rating = f.Rating,
                CourseId = f.CourseId,
                CourseName = f.Course?.Name,
                CreateAt = f.CreateAt
            });
        }
    }
}
