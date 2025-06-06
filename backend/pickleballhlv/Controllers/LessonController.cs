using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pickleball.Data;
using pickleball.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace pickleball.Controllers
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

        [HttpGet]
        public async Task<ActionResult<List<Lesson>>> GetAll()
        {
            return await _context.Lessons.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> Get(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null) return NotFound();
            return lesson;
        }

        [HttpPost]
        public async Task<ActionResult<Lesson>> Create(Lesson lesson)
        {
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = lesson.Id }, lesson);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Lesson updated)
        {
            if (id != updated.Id) return BadRequest();
            _context.Entry(updated).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null) return NotFound();

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
