using Microsoft.EntityFrameworkCore;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Upload> Uploads { get; set; }
        public DbSet<Analysis> Analyses { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Role).HasConversion<int>();
            });
            
            // Configure Course entity
            modelBuilder.Entity<Course>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Coach)
                      .WithMany(e => e.CoursesAsCoach)
                      .HasForeignKey(e => e.CoachId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.Status).HasConversion<int>();
            });
            
            // Configure Bill entity
            modelBuilder.Entity<Bill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.User)
                      .WithMany(e => e.Bills)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Course)
                      .WithMany(e => e.Bills)
                      .HasForeignKey(e => e.CourseId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.Status).HasConversion<int>();
            });
            
            // Configure Upload entity
            modelBuilder.Entity<Upload>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.User)
                      .WithMany(e => e.Uploads)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
            
            // Configure Analysis entity
            modelBuilder.Entity<Analysis>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Upload)
                      .WithMany(e => e.Analyses)
                      .HasForeignKey(e => e.UploadId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Coach)
                      .WithMany()
                      .HasForeignKey(e => e.CoachId)
                      .OnDelete(DeleteBehavior.SetNull);
            });
            
            // Configure Feedback entity
            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.User)
                      .WithMany(e => e.FeedbacksGiven)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Coach)
                      .WithMany(e => e.FeedbacksReceived)
                      .HasForeignKey(e => e.CoachId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Course)
                      .WithMany()
                      .HasForeignKey(e => e.CourseId)
                      .OnDelete(DeleteBehavior.SetNull);
            });
        }
    }
}