using MyApp.Models.coachH;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using coach.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace coach.use_case.StudentProgresses
{
    public class TrackProgress
    {
        private readonly ApplicationDbContext _context;

        public TrackProgress(ApplicationDbContext context)
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
