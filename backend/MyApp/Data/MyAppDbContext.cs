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

        // Nếu sắp tới có thêm bảng Huấn luyện viên:
        // public DbSet<Coach> Coaches { get; set; }
    }
}

