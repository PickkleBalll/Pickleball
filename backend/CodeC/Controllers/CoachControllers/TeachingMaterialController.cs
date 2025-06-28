using coach.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models.coachH;

namespace MyApp.Controllers.coach
{
    /// <summary>
    /// API dành cho huấn luyện viên để quản lý tài liệu giảng dạy (Teaching Materials).
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TeachingMaterialController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeachingMaterialController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách tài liệu giảng dạy theo CoachId.
        /// </summary>
        /// <param name="coachId">ID của huấn luyện viên</param>
        /// <returns>Danh sách TeachingMaterials kèm các file đính kèm</returns>
        [HttpGet("coach/{coachId}")]
        public async Task<ActionResult<List<TeachingMaterial>>> GetByCoach(string coachId)
        {
            var materials = await _context.TeachingMaterials
                .Include(tm => tm.Materials)
                .Where(m => m.CoachProfileId == coachId)
                .ToListAsync();

            return Ok(materials);
        }

        /// <summary>
        /// Tạo mới một tài liệu giảng dạy và upload nhiều file đi kèm (tối đa 100MB).
        /// </summary>
        /// <param name="title">Tiêu đề của tài liệu</param>
        /// <param name="description">Mô tả nội dung tài liệu</param>
        /// <param name="coachProfileId">ID của huấn luyện viên tạo tài liệu</param>
        /// <param name="files">Danh sách các file tải lên</param>
        /// <returns>Thông báo tạo thành công và ID của tài liệu</returns>
        [RequestSizeLimit(104857600)] // 100 MB
        [HttpPost("create")]
        public async Task<IActionResult> CreateTeachingMaterial(
            [FromForm] string title,
            [FromForm] string description,
            [FromForm] string coachProfileId,
            [FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            return BadRequest("No files uploaded.");

            var tempFolder = Path.GetTempPath();
            Directory.CreateDirectory(tempFolder);

            var materials = new List<Material>();

            foreach (var file in files)
            {
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            var uniqueFileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(tempFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var material = new Material
            {
                Path = filePath,
                FileName = file.FileName,
                UploadedDate = DateTime.UtcNow,
                MimeType = GetMimeTypeFromExtension(extension)
            };

            materials.Add(material);
            }

            var teachingMaterial = new TeachingMaterial
            {
            Title = title,
            Description = description,
            CoachProfileId = coachProfileId,
            Materials = materials
            };

            _context.TeachingMaterials.Add(teachingMaterial);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teaching material created successfully.", teachingMaterial.Id });
        }

        //[HttpGet("material/{id}")]
        //public async Task<IActionResult> GetMaterial(string id)
        //{
        //    var material = await _context.Materials.FindAsync(id);
        //    if (material == null)
        //        return NotFound();

        //    if (!System.IO.File.Exists(material.Path))
        //        return NotFound("File not found on disk.");

        //    var fileStream = new FileStream(material.Path, FileMode.Open, FileAccess.Read, FileShare.Read);
        //    var contentType = "application/octet-stream";
        //    return File(fileStream, contentType, material.FileName);
        //}

        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetTeachingMaterialById(string id)
        //{
        //    var teachingMaterial = await _context.TeachingMaterials
        //        .Include(tm => tm.Materials)
        //        .FirstOrDefaultAsync(tm => tm.Id == id);

        //    if (teachingMaterial == null)
        //        return NotFound();

        //    return Ok(teachingMaterial);
        //}

        //[HttpDelete("material/{id}")]
        //public async Task<IActionResult> DeleteMaterial(string id)
        //{
        //    var material = await _context.Materials.FindAsync(id);
        //    if (material == null)
        //        return NotFound();

        //    _context.Materials.Remove(material);
        //    await _context.SaveChangesAsync();

        //    if (System.IO.File.Exists(material.Path))
        //        System.IO.File.Delete(material.Path);

        //    return Ok(new { message = "Material deleted successfully." });
        //}

        /// <summary>
        /// Xóa tài liệu giảng dạy cùng toàn bộ file đính kèm.
        /// </summary>
        /// <param name="id">ID của tài liệu cần xóa</param>
        /// <returns>Thông báo xóa thành công</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeachingMaterial(string id)
        {
            var teachingMaterial = await _context.TeachingMaterials
                .Include(tm => tm.Materials)
                .FirstOrDefaultAsync(tm => tm.Id == id);

            if (teachingMaterial == null)
                return NotFound();

            foreach (var material in teachingMaterial.Materials)
            {
                if (System.IO.File.Exists(material.Path))
                    System.IO.File.Delete(material.Path);
            }

            _context.TeachingMaterials.Remove(teachingMaterial);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teaching material deleted successfully." });
        }
        
        private MimeType GetMimeTypeFromExtension(string extension)
        {
            return extension switch
            {
                ".pdf" => MimeType.Pdf,
                ".doc" => MimeType.Doc,
                ".docx" => MimeType.Docx,
                ".xls" => MimeType.Xls,
                ".xlsx" => MimeType.Xlsx,
                ".png" => MimeType.Png,
                ".jpeg" => MimeType.Jpeg,
                ".jpg" => MimeType.Jpg,
                ".gif" => MimeType.Gif,
                ".txt" => MimeType.Txt,
                ".csv" => MimeType.Csv,
                ".mp4" => MimeType.Mp4,
                ".mp3" => MimeType.Mp3,
                ".zip" => MimeType.Zip,
                ".rar" => MimeType.Rar,
                _ => MimeType.Other
            };
        }
    }
}