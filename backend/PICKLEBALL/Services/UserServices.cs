using Microsoft.EntityFrameworkCore;
using PICKLEBALL.Model;
using System.Collections.Generic; // Cho
using Microsoft.EntityFrameworkCore; // Cần thiết cho FindAsync() và SaveChangesAsy
using PICKLEBALL.Data;
namespace PICKLEBALL.Services
{
    public class UserServices //tao class
    {
        public class UserService 
        {
            private readonly ApplicationDbContext _context; //fields

            public UserService(ApplicationDbContext context)
            {
                _context = context;
            }
            public async Task<IEnumerable<User>> GetAllActiveUsers()
            {
                return await _context.Users.Where(u => u.IsActive).ToListAsync();
            }

            public async Task<User> SetUserActiveStatus(int userId, bool isActive)
            {
                var user = await _context.Users.FindAsync(userId);
                if (user != null)
                {
                    user.IsActive = isActive;
                    await _context.SaveChangesAsync();
                }
                return user;
            }
                
            public async Task<User> RegisterUser(User user)
            {
                user.LearnerCode = $"HV{DateTime.UtcNow.Ticks}";
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
            public async Task<User?> GetUserById(int id) => await _context.Users.FindAsync(id);
        }

    }
}
