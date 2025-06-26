using coach.Models;
using MyApp.Data;
using MyApp.Dto;
using MyApp.Models.CoachModels;
using Microsoft.EntityFrameworkCore;   
namespace MyApp.Services
{
    public class CoachRequestService
    {
        private readonly ApplicationDbContext _context;

        public CoachRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CoachRequest> SubmitRequestAsync(CreateCoachRequestDto dto)
        {
            var learner = await _context.Learners
                .Include(l => l.User)
                .FirstOrDefaultAsync(l => l.Id == dto.LearnerId);
            if (learner == null) throw new Exception("Learner không tồn tại.");

            var exists = await _context.CoachRequests
                .AnyAsync(r => r.LearnerId == dto.LearnerId && !r.IsApproved);
            if (exists) throw new Exception("Bạn đã gửi yêu cầu rồi. Vui lòng chờ duyệt.");

            var request = new CoachRequest
            {
                LearnerId = dto.LearnerId,
                Reason = dto.Reason
            };

            _context.CoachRequests.Add(request);
            await _context.SaveChangesAsync();

            return request;
        }

        public async Task<List<CoachRequest>> GetPendingRequestsAsync()
        {
            return await _context.CoachRequests
                .Where(r => !r.IsApproved)
                .Include(r => r.Learner)
                .ThenInclude(l => l.User)
                .ToListAsync();
        }

        public async Task<bool> ApproveRequestAsync(string requestId)
        {
            var request = await _context.CoachRequests
                .Include(r => r.Learner)
                .ThenInclude(l => l.User)
                .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null) throw new Exception("Yêu cầu không tồn tại.");

            request.IsApproved = true;

            var admin = request.Learner.User;
            admin.Role = "Coach";

            // Nếu chưa có hồ sơ CoachProfile thì thêm
            var profileExists = await _context.CoachProfiles.AnyAsync(c => c.UserId == admin.Id);
            if (!profileExists)
            {
                var coachProfile = new CoachProfile
                {
                    UserId = admin.Id,
                    FullName = request.Learner.FullName,
                    Email = request.Learner.Email,
                    PhoneNumber = request.Learner.PhoneNumber,
                    Gender = request.Learner.Gender,
                    DateOfBirth = request.Learner.DateOfBirth,
                    CreatedAt = DateTime.UtcNow,
                    IsVerified = true,
                    Specialty = "Chưa cập nhật"
                };
                _context.CoachProfiles.Add(coachProfile);
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
