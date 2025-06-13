using coach.Data;
using coach.Models;
using coach.use_case.StudentProgresses;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace coach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentProgressController : ControllerBase
    {
        private readonly TrackProgress _trackProgress;

        public StudentProgressController(AppDbContext context)
        {
            _trackProgress = new TrackProgress(context);
        }

        [HttpGet("{studentId}")]
        public async Task<ActionResult<List<StudentProgress>>> GetProgress(int studentId)
        {
            return await _trackProgress.ExecuteAsync(studentId);
        }
    }
}