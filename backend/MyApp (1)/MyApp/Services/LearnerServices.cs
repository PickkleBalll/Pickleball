
using MyApp.Models.admin_login;
using System.Collections.Generic; // Cho
using Microsoft.EntityFrameworkCore; // Cần thiết cho FindAsync() và SaveChangesAsy
using MyApp.Data;
using MyApp.Models.learneR;
namespace MyApp.Services
{
    public class LearnerServices //tao class
    {
        public class UserService 
        {
            private readonly ApplicationDbContext _context; //fields

            public UserService(ApplicationDbContext context)
            {
                _context = context;
            }
            public async Task<IEnumerable<Learner>> GetAllActiveUsers()
            {
                return await _context.Learners.Where(u => u.IsActive).ToListAsync();
            }

            public async Task<Learner> SetUserActiveStatus(string userId, bool isActive)
            {
                var user = await _context.Learners.FindAsync(userId);
                if (user != null)
                {
                    user.IsActive = isActive;
                    await _context.SaveChangesAsync();
                }
                return user;
            }
                
            public async Task<Learner> RegisterUser(Learner user)
            {
                //user.LearnerCode = $"HV{DateTime.UtcNow.Ticks}";
                _context.Learners.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
            public async Task<Learner?> GetUserById(string id) => await _context.Learners.FindAsync(id);
        }

    }
}
