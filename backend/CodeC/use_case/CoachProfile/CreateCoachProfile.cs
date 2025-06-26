using MyApp.Data;
using coach.Models;
using System.Threading.Tasks;

namespace coach.use_case.CoachProfiles
{
    public class CreateCoachProfile
    {
        private readonly ApplicationDbContext _context;

        public CreateCoachProfile(ApplicationDbContext context)
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
