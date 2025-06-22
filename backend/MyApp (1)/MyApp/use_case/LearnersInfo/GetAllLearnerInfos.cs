using MyApp.Data;
using MyApp.Models.learneR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyApp.UseCase.Learners
{
    public class GetAllLearnerInfos
    {
        private readonly ApplicationDbContext _context;

        public GetAllLearnerInfos(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<LearnerInfo>> ExecuteAsync()
        {
            return await _context.LearnerInfos.ToListAsync();
        }
    }
}
