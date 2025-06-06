using Microsoft.AspNetCore.Mvc;
using pickleball.Data;
using pickleball.Models;
using pickleball.use_case.StudentProgresses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace pickleball.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentProgressController : ControllerBase
    {
        private readonly TrackProgress _trackProgress;

        public StudentProgressController(AppDbContext context)
        {
            _trackProgress = new TrackProgress(context);
        }

        [HttpGet("{studentId}")]
        public async Task<ActionResult<List<StudentProgress>>> GetProgress(int studentId)
        {
            return await _trackProgress.ExecuteAsync(studentId);
        }
    }
}