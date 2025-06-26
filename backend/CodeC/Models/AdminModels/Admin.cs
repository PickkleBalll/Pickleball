using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models.admin_login
{
    [Table("Admins")]
    public class Admin
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Fullname { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "User"; // User / Admin / Coach

        public bool IsActive { get; set; } = true; // Trạng thái hoạt động
        // ✅ Thêm dòng này
        public bool IsVerified { get; set; } = false; // Tài khoản đã xác minh hay chưa
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
