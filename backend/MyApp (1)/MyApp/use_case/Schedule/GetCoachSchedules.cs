//using Microsoft.EntityFrameworkCore;
//using MyApp.Data;
//using MyApp.Models.coachH;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace MyApp.UseCase.Schedules
//{
//    public class GetCoachSchedules
//    {
//        private readonly ApplicationDbContext _context;

//        public GetCoachSchedules(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<List<Schedule>> ExecuteAsync(int coachId)
//{
//    return await _context.Schedules
//        .Where(s => s.CoachId == coachId)
//        .ToListAsync();
//}
//    }
//}
