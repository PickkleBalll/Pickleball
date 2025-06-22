using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.UseCase.Learners;
using MyApp.Models.learneR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LearnerInfoController : ControllerBase
    {
        private readonly GetAllLearnerInfos _getAllLearnerInfos;

        public LearnerInfoController(GetAllLearnerInfos getAllLearnerInfos)
        {
            _getAllLearnerInfos = getAllLearnerInfos;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Coach")] // Chỉ Admin hoặc Coach mới được xem danh sách học viên
        public async Task<ActionResult<List<LearnerInfo>>> GetLearners()
        {
            var learners = await _getAllLearnerInfos.ExecuteAsync();
            return Ok(learners);
        }
    }
}
