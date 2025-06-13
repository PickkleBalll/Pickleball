using Microsoft.EntityFrameworkCore;
using coach.Data;
using coach.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace coach.use_case.Payments
{
    public class ManagePayments
    {
        private readonly AppDbContext _context;

        public ManagePayments(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Payment>> ExecuteAsync(int coachId)
        {
            return await _context.Payments
                .Where(p => p.CoachId == coachId)
                .ToListAsync();
        }
    }
}
