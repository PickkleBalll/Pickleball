using PickleballCourseAPI.DTOs;

namespace PickleballCourseAPI.Services
{
    public interface IBillService
    {
        Task<IEnumerable<BillDto>> GetAllBillsAsync();
        Task<BillDto?> GetBillByIdAsync(string id);
        Task<BillDto> CreateBillAsync(string userId, CreatePaymentDto createPaymentDto);
        Task<BillDto> ProcessPaymentAsync(ProcessPaymentDto processPaymentDto);
        Task<IEnumerable<BillDto>> GetBillsByUserAsync(string userId);
    }
}