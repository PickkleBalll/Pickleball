using coach.use_case.StudentProgresses;
using Microsoft.AspNetCore.Mvc;
using MyApp.Data;
using MyApp.Models.coachH;                       
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyApp.Controllers.coach                    
{
    /// <summary>
    /// API cho phép huấn luyện viên theo dõi tiến trình học tập của học viên.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CoachFollowStudentProgressController : ControllerBase
    {
        private readonly TrackProgress _trackProgress;

        public CoachFollowStudentProgressController(ApplicationDbContext context) 
        {
            _trackProgress = new TrackProgress(context);
        }
        /// <summary>
        /// Lấy danh sách tiến trình học tập của học viên theo ID.
        /// </summary>
        /// <param name="studentId">ID của học viên</param>
        /// <returns>
        /// Danh sách các bản ghi tiến trình học tập của học viên.
        /// </returns>
        [HttpGet("{studentId}")]
        public async Task<ActionResult<List<StudentProgress>>> GetProgress(string studentId)
        {
            var result = await _trackProgress.ExecuteAsync(studentId);
            return Ok(result);
        }
    }
}
