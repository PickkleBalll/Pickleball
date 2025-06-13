using Microsoft.AspNetCore.Mvc;
;
using coach.Models;
using coach.use_case.TeachingMaterials;

namespace coach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeachingMaterialController : ControllerBase
    {
        private readonly GetMaterials _getMaterials;

        public TeachingMaterialController(AppDbContext context)
        {
            _getMaterials = new GetMaterials(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<TeachingMaterial>>> GetAll()
        {
            return await _getMaterials.ExecuteAsync();
        }
    }
}