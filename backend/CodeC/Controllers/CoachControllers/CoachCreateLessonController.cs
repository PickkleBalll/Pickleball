//using coach.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using MyApp.Data;
//using MyApp.Models.coachH;

//namespace MyApp.Controllers.coach
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class LessonController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public LessonController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost("create")]
//        public async Task<IActionResult> CreateLesson([FromBody] Lesson lesson)
//        {
//            var coach = await _context.CoachProfiles.FindAsync(lesson.CoachProfileId);
//            if (coach == null)
//            {
//                return NotFound($"CoachProfile với ID {lesson.CoachProfileId} không tồn tại.");
//            }

//            lesson.CoachProfile = coach;

//            _context.Lessons.Add(lesson);
//            await _context.SaveChangesAsync();

//            return Ok(lesson);
//        }
//    }
//}
