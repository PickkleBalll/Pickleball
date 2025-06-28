using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PickleballCourseAPI.Models
{
    public class Bill
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string UserId { get; set; }
        
        [Required]
        public string CourseId { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        
        public BillStatus Status { get; set; } = BillStatus.Pending;
        
        public string? PaymentMethod { get; set; }
        
        public string? TransactionId { get; set; }
        
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? PaidAt { get; set; }
        
        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        
        [ForeignKey("CourseId")]
        public virtual Course Course { get; set; }
    }
    
    public enum BillStatus
    {
        Pending = 0,
        Paid = 1,
        Failed = 2,
        Cancelled = 3,
        Refunded = 4
    }
}