using Microsoft.AspNetCore.Mvc;
using pickleball.Data;
using pickleball.Models;
using pickleball.use_case.Rankings;

namespace pickleball.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RankingController : ControllerBase
    {
        private readonly GetRankings _getRankings;

        public RankingController(AppDbContext context)
        {
            _getRankings = new GetRankings(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<Ranking>>> GetAll()
        {
            return await _getRankings.ExecuteAsync();
        }
    }
}