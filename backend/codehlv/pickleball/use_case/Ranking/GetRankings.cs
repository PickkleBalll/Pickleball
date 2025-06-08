using Microsoft.EntityFrameworkCore;
using pickleball.Data;
using pickleball.Models;

namespace pickleball.use_case.Rankings
{
    public class GetRankings
    {
        private readonly AppDbContext _context;

        public GetRankings(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Ranking>> ExecuteAsync()
        {
            return await _context.Rankings.ToListAsync();
        }
    }
}
