using Microsoft.EntityFrameworkCore;
using PICKLEBALL.Model;

namespace PICKLEBALL.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Feedbacks> Feedbacks { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cấu hình Precision cho Amount của Payment
            modelBuilder.Entity<Payment>()
                .Property(b => b.Amount)
                .HasPrecision(18, 2);

            // Thêm các cấu hình model khác ở đây nếu có
            // Ví dụ: Quan hệ giữa Booking và User (nếu chưa có trong Model của Booking)
            // modelBuilder.Entity<Booking>()
            //     .HasOne(b => b.Learner)
            //     .WithMany() // Hoặc WithMany(u => u.Bookings) nếu có Navigation Property trong User
            //     .HasForeignKey(b => b.LearnerId)
            //     .OnDelete(DeleteBehavior.Cascade); // Ví dụ, hãy kiểm tra lại Business logic của bạn
        }
    }
}
