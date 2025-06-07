using System;
using System.Threading.Tasks;
using pickleball.Data;
using pickleball.Models;

namespace pickleball.use_case.CoachProfiles
{
    public class CreateCoachProfile
    {
        private readonly AppDbContext _context;

        public CreateCoachProfile(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CoachProfile> ExecuteAsync(CoachProfile profile)
        {
            _context.CoachProfiles.Add(profile);
            await _context.SaveChangesAsync();
            return profile;
        }
    }
}
