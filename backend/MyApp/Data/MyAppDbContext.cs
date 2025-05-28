using Microsoft.EntityFrameworkCore;
using MyApp.Models;  // namespace chứa class User

namespace MyApp.Data
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options)
            : base(options)
        {
        }

        // DbSet đại diện cho bảng Users trong database
        public DbSet<User> Users { get; set; }
    }
}
