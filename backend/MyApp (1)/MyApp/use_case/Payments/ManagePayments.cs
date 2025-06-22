using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MyApp.Models.learneR;

namespace MyApp.UseCase.Payments
{
    public class ManagePayments
    {
        private readonly ApplicationDbContext _context;

        public ManagePayments(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Payment>> ExecuteAsync(int coachId)
        {
            return await _context.Payments
                .Where(p => p.Id == coachId)
                .ToListAsync();
        }
    }
}
