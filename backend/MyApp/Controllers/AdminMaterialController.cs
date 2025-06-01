using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/admin/materials")]
    [Authorize(Roles = "Admin")]
    public class AdminMaterialController : ControllerBase
    {
        private readonly MyAppDbContext _context;

        public AdminMaterialController(MyAppDbContext context)
        {
            _context = context;
        }

        // 1. Danh sách tài liệu
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var materials = await _context.LearningMaterials
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();

            return Ok(materials);
        }

        // 2. Thêm tài liệu mới
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LearningMaterial request)
        {
            request.Id = Guid.NewGuid();
            request.CreatedAt = DateTime.UtcNow;

            await _context.LearningMaterials.AddAsync(request);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Material created successfully." });
        }

        // 3. Cập nhật tài liệu
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] LearningMaterial request)
        {
            var material = await _context.LearningMaterials.FindAsync(id);
            if (material == null) return NotFound("Material not found.");

            material.Title = request.Title;
            material.Description = request.Description;
            material.FileUrl = request.FileUrl;
            material.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Material updated successfully." });
        }

        // 4. Xóa tài liệu
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var material = await _context.LearningMaterials.FindAsync(id);
            if (material == null) return NotFound("Material not found.");

            _context.LearningMaterials.Remove(material);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Material deleted successfully." });
        }
    }
}
