using Microsoft.AspNetCore.Mvc;
using pickleball.Data;
using pickleball.Models;
using pickleball.use_case.Assignments;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace pickleball.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssignmentController : ControllerBase
    {
        private readonly AssignHomework _assignHomework;

        public AssignmentController(AppDbContext context)
        {
            _assignHomework = new AssignHomework(context);
        }

        [HttpPost]
        public async Task<ActionResult<Assignment>> Assign([FromBody] Assignment assignment)
        {
            var result = await _assignHomework.ExecuteAsync(assignment);
            return CreatedAtAction(nameof(Assign), new { id = result.Id }, result);
        }
    }
}