using Microsoft.EntityFrameworkCore;
using MyApp.Models;
using System;
using System.Linq;

namespace MyApp.Data
{
    public static class SeedData
    {
        public static void Initialize(MyAppDbContext context)
        {
            if (context.Users.Any()) return; // tránh chèn trùng

            var users = Enumerable.Range(1, 10).Select(i => new User
            {
                Id = Guid.NewGuid(),
                Fullname = $"User {i}",
                Email = $"user{i}@example.com",
                PhoneNumber = $"09000000{i}",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                Role = "User",
                IsVerified = true,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            var coaches = Enumerable.Range(1, 10).Select(i => new User
            {
                Id = Guid.NewGuid(),
                Fullname = $"Coach {i}",
                Email = $"coach{i}@example.com",
                PhoneNumber = $"09999999{i}",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                Role = "Coach",
                IsVerified = true,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            context.Users.AddRange(users);
            context.Users.AddRange(coaches);
            context.SaveChanges();

            var reviews = coaches.SelectMany(coach =>
                users.Take(10).Select(user => new Review
                {
                    Id = Guid.NewGuid(),
                    CoachId = coach.Id,
                    ReviewerId = user.Id,
                    Rating = new Random().Next(3, 6),
                    Comment = $"Good coach by {user.Fullname}",
                    CreatedAt = DateTime.UtcNow
                })
            ).ToList();

            context.Reviews.AddRange(reviews);
            context.SaveChanges();
        }
    }
}
