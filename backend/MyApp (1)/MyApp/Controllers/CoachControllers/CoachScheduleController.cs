//using coach.Models;
//using MyApp.UseCase.Schedules;
//using Microsoft.AspNetCore.Mvc;
//using MyApp.Data;
//using MyApp.Models.coachH;                    // ✅ Nếu model Schedule nằm ở đây                 // ✅ Đảm bảo thư mục là UseCase/Schedule
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace MyApp.Controllers.coach              // ✅ Đặt đúng theo thư mục Controllers/coach
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class CoachScheduleController : ControllerBase
//    {
//        private readonly GetCoachSchedules _getCoachSchedules;

//        public CoachScheduleController(ApplicationDbContext context)   // ✅ Dùng đúng DbContext
//        {
//            _getCoachSchedules = new GetCoachSchedules(context);
//        }

//        [HttpGet("{coachId}")]
//        public async Task<ActionResult<List<Schedule>>> GetSchedule(int coachId)
//        {
//            return await _getCoachSchedules.ExecuteAsync(coachId);
//        }
//    }
//}
