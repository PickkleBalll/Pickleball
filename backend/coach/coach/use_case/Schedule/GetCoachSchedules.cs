using Microsoft.EntityFrameworkCore;
using coach.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace coach.use_case.Schedule
{
    public class GetCoachSchedules
    {
        private readonly AppDbContext _context;

        public GetCoachSchedules(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<object>> ExecuteAsync(int coachId)
        {
            var result = await _context.Schedules
                .Where(s => s.CoachId == coachId)
                .GroupBy(s => s.CourseName)
                .Select(g => new
                {
                    CourseName = g.Key,
                    TotalSessions = g.Count()
                })
                .ToListAsync();

            return result.Cast<object>().ToList();
        }
    }
}
