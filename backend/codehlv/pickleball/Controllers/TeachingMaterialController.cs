using Microsoft.AspNetCore.Mvc;
using pickleball.Data;
using pickleball.Models;
using pickleball.use_case.TeachingMaterials;

namespace pickleball.Controllers
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