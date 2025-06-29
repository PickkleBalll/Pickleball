namespace MyApp.Models.learneR

{
    public class Payment
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();


        public string BookingId { get; set; }
        public Booking Booking { get; set; } = default!;

        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; } = DateTime.UtcNow;
        public string PaymentMethod { get; set; } = "VNPay";
        public string TransactionId { get; set; } = string.Empty;

        public bool IsSuccess { get; set; } = true;
    }
}
