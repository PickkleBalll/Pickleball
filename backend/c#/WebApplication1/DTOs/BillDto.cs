using System.ComponentModel.DataAnnotations;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.DTOs
{
    public class BillDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public string CourseId { get; set; }
        public string CourseName { get; set; }
        public decimal Amount { get; set; }
        public BillStatus Status { get; set; }
        public string? PaymentMethod { get; set; }
        public string? TransactionId { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime? PaidAt { get; set; }
    }
    
    public class CreatePaymentDto
    {
        [Required]
        public string CourseId { get; set; }
        
        [Required]
        public string PaymentMethod { get; set; }
    }
    
    public class ProcessPaymentDto
    {
        [Required]
        public string BillId { get; set; }
        
        [Required]
        public string TransactionId { get; set; }
        
        [Required]
        public BillStatus Status { get; set; }
    }
}