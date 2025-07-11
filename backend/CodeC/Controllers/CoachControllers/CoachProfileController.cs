﻿// Controllers/coach/CoachProfilesController.cs

using coach.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;

namespace MyApp.Controllers.coach
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoachProfilesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoachProfilesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy toàn bộ coach
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoachProfile>>> GetAll()
        {
            return await _context.CoachProfiles.ToListAsync();
        }

        // API Become a Coach
        [HttpPost("register")]
        public async Task<ActionResult<CoachProfile>> RegisterAsCoach([FromBody] CoachProfileCreateDto dto)
        {
            var coach = new CoachProfile
            {
                // Id sẽ tự sinh bằng Guid.NewGuid().ToString() trong model
                FullName = dto.FullName,
                Specialty = dto.Specialty,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth
            };

            _context.CoachProfiles.Add(coach);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = coach.Id }, coach);
        }

        // PUT: api/CoachProfiles/by-user/{userId}
        [HttpPut("by-user/{userId}")]
        public async Task<IActionResult> UpdateCoachByUserId(string userId, [FromBody] CoachProfileUpdateDto dto)
        {
            var coach = await _context.CoachProfiles.FirstOrDefaultAsync(c => c.UserId == userId);
            if (coach == null)
                return NotFound(new { message = "Coach profile not found for this userId." });

            // Cập nhật thông tin
            coach.FullName = dto.FullName;
            coach.Specialty = dto.Specialty;
            coach.Email = dto.Email;
            coach.PhoneNumber = dto.PhoneNumber;
            coach.Gender = dto.Gender;
            coach.DateOfBirth = dto.DateOfBirth;

            await _context.SaveChangesAsync();

            return Ok(coach); // hoặc return NoContent();
        }

        // Lấy hồ sơ coach theo ID
        [HttpGet("by-user/{userId}")]
        public async Task<ActionResult<CoachProfile>> GetCoachByUserId(string userId)
        {
            var coach = await _context.CoachProfiles.FirstOrDefaultAsync(c => c.UserId == userId);
            if (coach == null)
                return NotFound();

            return Ok(coach);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CoachProfile>> GetCoachById(string id)
        {
            var coach = await _context.CoachProfiles.FindAsync(id);
            if (coach == null)
                return NotFound();

            return Ok(coach);
        }
    }
}
