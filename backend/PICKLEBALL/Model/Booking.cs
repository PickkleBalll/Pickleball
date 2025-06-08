namespace PICKLEBALL.Model
{
    public class Booking
    {
        public int Id { get; set; }
        public int LearnerId { get; set; }
        public User Learner { get; set; } = default!;
        public string CourseName { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
        public bool IsPaid { get; set; } = false;
        public int CoachId { get; set; }
        // Thêm navigation đến Payment
        public List<Payment> Payments { get; set; } = new();
    }
}
