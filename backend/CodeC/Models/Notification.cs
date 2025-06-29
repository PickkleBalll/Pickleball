using System.ComponentModel.DataAnnotations;

namespace MyApp.Models
{
    public class Notification
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string UserId { get; set; }  // Người nhận thông báo
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string Role { get; set; }  // "Learner" hoặc "Admin"
    }
}
