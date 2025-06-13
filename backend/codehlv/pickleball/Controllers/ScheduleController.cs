using Microsoft.AspNetCore.Mvc;
using coach.use_case.Schedule;
;

namespace coach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly GetCoachSchedules _getCoachSchedules;

        public ScheduleController(AppDbContext context)
        {
            _getCoachSchedules = new GetCoachSchedules(context);
        }

        [HttpGet("{coachId}")]
        public async Task<ActionResult<List<object>>> GetSchedule(int coachId)
        {
            return await _getCoachSchedules.ExecuteAsync(coachId);
        }
    }
}