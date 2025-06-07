using System;
using System.Threading.Tasks;
using pickleball.Data;
using pickleball.Models;

namespace pickleball.use_case.Assignments
{
    public class AssignHomework
    {
        private readonly AppDbContext _context;

        public AssignHomework(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Assignment> ExecuteAsync(Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();
            return assignment;
        }
    }
}
