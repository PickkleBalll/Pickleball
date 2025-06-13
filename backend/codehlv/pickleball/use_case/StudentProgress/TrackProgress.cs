using Microsoft.EntityFrameworkCore;
;
using coach.Models;

namespace coach.use_case.StudentProgresses
{
    public class TrackProgress
    {
        private readonly AppDbContext _context;

        public TrackProgress(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<StudentProgress>> ExecuteAsync(int studentId)
        {
            return await _context.StudentProgresses
                .Where(p => p.StudentId == studentId)
                .ToListAsync();
        }
    }
}
