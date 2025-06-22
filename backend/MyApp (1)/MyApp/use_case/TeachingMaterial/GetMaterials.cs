using Microsoft.EntityFrameworkCore;
using MyApp.Data;                             // ✅ Đổi từ coach.Data sang MyApp.Data
using MyApp.Models.coachH;                   // ✅ Model TeachingMaterial sau khi gộp
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyApp.UseCase.TeachingMaterials      // ✅ Viết đúng để match namespace dùng ở Controller
{
    public class GetMaterials
    {
        private readonly ApplicationDbContext _context;

        public GetMaterials(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TeachingMaterial>> ExecuteAsync()
        {
            return await _context.TeachingMaterials.ToListAsync();
        }
    }
}
