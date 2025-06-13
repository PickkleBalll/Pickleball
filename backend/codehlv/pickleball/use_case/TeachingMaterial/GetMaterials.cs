using Microsoft.EntityFrameworkCore;
;
using coach.Models;

namespace coach.use_case.TeachingMaterials
{
    public class GetMaterials
    {
        private readonly AppDbContext _context;

        public GetMaterials(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TeachingMaterial>> ExecuteAsync()
        {
            return await _context.TeachingMaterials.ToListAsync();
        }
    }
}
