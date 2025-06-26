using MyApp.Data;
using MyApp.Dto;
using MyApp.Models;
using MyApp.Models.LearnerModels;
using Microsoft.EntityFrameworkCore;
namespace MyApp.Services
{
    public class VideoFeedbackService
    {
        private readonly ApplicationDbContext _context;

        public VideoFeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<VideoFeedback> AddFeedbackAsync(VideoFeedbackDto dto)
        {
            var video = await _context.Videos.FindAsync(dto.VideoId);
            if (video == null)
                throw new Exception("Video không tồn tại");

            var coach = await _context.CoachProfiles.FindAsync(dto.CoachId);
            if (coach == null)
                throw new Exception("Coach không tồn tại");

            var feedback = new VideoFeedback
            {
                VideoId = dto.VideoId,
                CoachId = dto.CoachId,
                Comment = dto.Comment
            };

            _context.VideoFeedbacks.Add(feedback);

            // Gửi thông báo cho học viên
            _context.Notifications.Add(new Notification
            {
                UserId = video.UserId,
                Role = "Learner",
                Title = "Feedback từ HLV",
                Message = $"Video của bạn đã được HLV {coach.FullName} nhận xét."
            });

            await _context.SaveChangesAsync();
            return feedback;
        }

        public async Task<List<VideoFeedback>> GetFeedbacksByVideo(string videoId)
        {
            return await _context.VideoFeedbacks
                .Where(f => f.VideoId == videoId)
                .Include(f => f.Coach)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
        }
    }
}
