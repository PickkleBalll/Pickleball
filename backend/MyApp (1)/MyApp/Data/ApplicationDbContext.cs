using coach.Models;
using Microsoft.EntityFrameworkCore;
using MyApp.Models.admin_login;
using MyApp.Models.coachH;
using MyApp.Models.learneR;
using MyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // DbSet cho Auth
        public DbSet<Admin> Admins { get; set; }  // người đăng nhập hệ thống

        // DbSet cho Coach & Learner
        public DbSet<Learner> Learners { get; set; }  // :exclamation:️ sửa từ Users -> Learners
        public DbSet<CoachProfile> CoachProfiles { get; set; }

        // DbSet hỗ trợ huấn luyện
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<StudentProgress> StudentProgresses { get; set; }
       // public DbSet<Schedule> Schedules { get; set; }
        public DbSet<TeachingMaterial> TeachingMaterials { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<LearnerInfo> LearnerInfos { get; set; }

        // Các bảng khác
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Feedbacks> Feedbacks { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<ReviewAllCoach> Reviews { get; set; }
        //public DbSet<Video> Videos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasPrecision(18, 2);

            // Cấu hình quan hệ Booking → Lesson
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Lesson)
                .WithMany()
                .HasForeignKey(b => b.LessonId)
                .OnDelete(DeleteBehavior.Restrict); // ❌ tránh cascade

            // Cấu hình quan hệ Booking → CoachProfile
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.CoachProfile)
                .WithMany()
                .HasForeignKey(b => b.CoachProfileId)
                .OnDelete(DeleteBehavior.Restrict); // ❌ tránh cascade
                                                    // Booking → Learner
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Learner)
                .WithMany()
                .HasForeignKey(b => b.LearnerId)
                .HasPrincipalKey(l => l.Id)  //  Nếu Learner.Id là string
               .OnDelete(DeleteBehavior.Restrict); 
        }


        public void Seed()
        {
            if (Admins.Any()) return;  // :white_check_mark: kiểm tra Admins thay vì Users

            var users = Enumerable.Range(1, 10).Select(i => new Admin
            {
                Id = Guid.NewGuid().ToString(),
                Fullname = $"User {i}",
                Email = $"user{i}@example.com",
                PhoneNumber = $"09000000{i}",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                Role = "User",
                IsVerified = true,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            var coaches = Enumerable.Range(1, 10).Select(i => new Admin
            {
                Id = Guid.NewGuid().ToString(),
                Fullname = $"Coach {i}",
                Email = $"coach{i}@example.com",
                PhoneNumber = $"09999999{i}",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                Role = "Coach",
                IsVerified = true,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            Admins.AddRange(users);
            Admins.AddRange(coaches);
            SaveChanges();

            var reviews = coaches.SelectMany(coach =>
                users.Take(10).Select(user => new ReviewAllCoach
                {
                    Id = Guid.NewGuid().ToString(),
                    CoachId = coach.Id,
                    ReviewerId = user.Id,
                    Rating = new Random().Next(3, 6),
                    Comment = $"Good coach by {user.Fullname}",
                    CreatedAt = DateTime.UtcNow
                })
            ).ToList();

            Reviews.AddRange(reviews);
            SaveChanges();
        }
    }
}