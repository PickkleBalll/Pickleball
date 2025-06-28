using System.ComponentModel.DataAnnotations;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
    
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        
        [Required]
        public UserRole Role { get; set; }
        
        public string? Phone { get; set; }
        
        public string? Bio { get; set; }
    }
    
    public class AuthResponseDto
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
    
    public class UserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
        public bool IsActive { get; set; }
        public string? Phone { get; set; }
        public string? EmailContact { get; set; }
        public string? Bio { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
    
    public class UpdateUserDto
    {
        public string? Phone { get; set; }
        public string? EmailContact { get; set; }
        public string? Bio { get; set; }
        public bool? IsActive { get; set; }
    }
}