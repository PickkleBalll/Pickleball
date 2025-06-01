using System;
using System.ComponentModel.DataAnnotations;

namespace MyApp.Models
{
    public class User
    {
        [Key] // Khóa chính
        public Guid Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "User"; // User / Admin / Coach (nếu mở rộng)

        public bool IsVerified { get; set; } = false; // Mặc định chưa xác minh

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Ngày tạo

        public DateTime? VerifiedAt { get; set; } // Ngày xác minh (nếu có)

        // ✅ THÊM MỚI:
        public string Fullname { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }

        public string Gender { get; set; } = string.Empty; // Male / Female / Other

        public string PhoneNumber { get; set; } = string.Empty;
    }
}

