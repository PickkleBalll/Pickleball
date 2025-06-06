using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pickleball.Data;
using pickleball.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


[ApiController]
[Route("api/[controller]")]
public class CoachProfilesController : ControllerBase
{
    private readonly AppDbContext _context;
    public CoachProfilesController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CoachProfile>>> GetAll() =>
        await _context.CoachProfiles.ToListAsync();

    [HttpPost]
    public async Task<ActionResult<CoachProfile>> Create(CoachProfile profile)
    {
        _context.CoachProfiles.Add(profile);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = profile.Id }, profile);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CoachProfile updated)
    {
        if (id != updated.Id) return BadRequest();
        _context.Entry(updated).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _context.CoachProfiles.FindAsync(id);
        if (entity == null) return NotFound();
        _context.CoachProfiles.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
