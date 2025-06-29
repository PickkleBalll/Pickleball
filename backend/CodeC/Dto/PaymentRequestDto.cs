namespace MyApp.Dto
{
    public class PaymentRequestDto
    {
        public decimal Amount { get; set; }
        public string Method { get; set; } = "VNPay";
        public string TransactionId { get; set; } = string.Empty;
    }
}
