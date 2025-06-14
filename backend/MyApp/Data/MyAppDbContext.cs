using Microsoft.EntityFrameworkCore;
using MyApp.Models;

namespace MyApp.Data
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options)
            : base(options)
        {
        }

        // DbSet đại diện cho các bảng trong database
        public DbSet<User> Users { get; set; }
        public DbSet<LearningMaterial> LearningMaterials { get; set; }
        public DbSet<Review> Reviews { get; set; }  // ✅ Thêm bảng Review
    }
}

