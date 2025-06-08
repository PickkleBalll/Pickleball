namespace PICKLEBALL.Model
{
    public class Payment
    {
        public int Id { get; set; }

        public int BookingId { get; set; }
        public Booking Booking { get; set; } = default!;

        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; } = DateTime.UtcNow;
        public string PaymentMethod { get; set; } = "VNPay";
        public string TransactionId { get; set; } = string.Empty;

        public bool IsSuccess { get; set; } = true;
    }
}
