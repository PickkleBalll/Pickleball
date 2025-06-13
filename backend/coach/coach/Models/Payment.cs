using System;

namespace coach.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int CoachId { get; set; }
        public string StudentName { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; }
        public string Method { get; set; }
    }
}