using Microsoft.EntityFrameworkCore;
using pickleball.Models;

namespace pickleball.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<CoachProfile> CoachProfiles { get; set; }
        public DbSet<TeachingMaterial> TeachingMaterials { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<StudentProgress> StudentProgresses { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(18,2)");

            base.OnModelCreating(modelBuilder);
        }
    }
}
