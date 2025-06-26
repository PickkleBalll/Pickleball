using coach.use_case.StudentProgresses;
using Microsoft.AspNetCore.Mvc;
using MyApp.Data;
using MyApp.Models.coachH;                       
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyApp.Controllers.coach                    
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoachFollowStudentProgressController : ControllerBase
    {
        private readonly TrackProgress _trackProgress;

        public CoachFollowStudentProgressController(ApplicationDbContext context) 
        {
            _trackProgress = new TrackProgress(context);
        }

        [HttpGet("{studentId}")]
        public async Task<ActionResult<List<StudentProgress>>> GetProgress(string studentId)
        {
            var result = await _trackProgress.ExecuteAsync(studentId);
            return Ok(result);
        }
    }
}
