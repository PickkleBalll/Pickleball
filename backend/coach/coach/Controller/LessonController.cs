using coach.Models;
using coach.Data; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace coach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LessonController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpPost("create")]
        public async Task<IActionResult> CreateLesson([FromBody] Lesson lesson)
        {
            
            var coach = await _context.CoachProfiles.FindAsync(lesson.CoachProfileId);
            if (coach == null)
            {
                return NotFound($"CoachProfile với ID {lesson.CoachProfileId} không tồn tại.");
            }

            
            lesson.CoachProfile = coach;

            
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return Ok(lesson); 
        }
    }
}
