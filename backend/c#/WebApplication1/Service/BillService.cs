using Microsoft.EntityFrameworkCore;
using PickleballCourseAPI.Data;
using PickleballCourseAPI.DTOs;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.Services
{
    public class BillService : IBillService
    {
        private readonly ApplicationDbContext _context;

        public BillService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BillDto>> GetAllBillsAsync()
        {
            return await _context.Bills
                .Include(b => b.User)
                .Include(b => b.Course)
                .Select(b => new BillDto
                {
                    Id = b.Id,
                    UserId = b.UserId,
                    UserEmail = b.User.Email,
                    CourseId = b.CourseId,
                    CourseName = b.Course.Name,
                    Amount = b.Amount,
                    Status = b.Status,
                    PaymentMethod = b.PaymentMethod,
                    TransactionId = b.TransactionId,
                    CreateAt = b.CreateAt,
                    PaidAt = b.PaidAt
                })
                .ToListAsync();
        }

        public async Task<BillDto?> GetBillByIdAsync(string id)
        {
            var bill = await _context.Bills
                .Include(b => b.User)
                .Include(b => b.Course)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (bill == null) return null;

            return new BillDto
            {
                Id = bill.Id,
                UserId = bill.UserId,
                UserEmail = bill.User.Email,
                CourseId = bill.CourseId,
                CourseName = bill.Course.Name,
                Amount = bill.Amount,
                Status = bill.Status,
                PaymentMethod = bill.PaymentMethod,
                TransactionId = bill.TransactionId,
                CreateAt = bill.CreateAt,
                PaidAt = bill.PaidAt
            };
        }

        public async Task<BillDto> CreateBillAsync(string userId, CreatePaymentDto createPaymentDto)
        {
            var course = await _context.Courses.FindAsync(createPaymentDto.CourseId);
            var user = await _context.Users.FindAsync(userId);

            if (course == null || user == null)
                throw new Exception("User or course not found.");

            var bill = new Bill
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                CourseId = createPaymentDto.CourseId,
                Amount = course.Price,
                Status = BillStatus.Pending,
                PaymentMethod = createPaymentDto.PaymentMethod,
                CreateAt = DateTime.UtcNow
            };

            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return new BillDto
            {
                Id = bill.Id,
                UserId = userId,
                UserEmail = user.Email,
                CourseId = course.Id,
                CourseName = course.Name,
                Amount = bill.Amount,
                Status = bill.Status,
                PaymentMethod = bill.PaymentMethod,
                CreateAt = bill.CreateAt
            };
        }

        public async Task<BillDto> ProcessPaymentAsync(ProcessPaymentDto dto)
        {
            var bill = await _context.Bills
                .Include(b => b.User)
                .Include(b => b.Course)
                .FirstOrDefaultAsync(b => b.Id == dto.BillId);

            if (bill == null)
                throw new Exception("Bill not found.");

            bill.TransactionId = dto.TransactionId;
            bill.Status = dto.Status;
            bill.PaidAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new BillDto
            {
                Id = bill.Id,
                UserId = bill.UserId,
                UserEmail = bill.User.Email,
                CourseId = bill.CourseId,
                CourseName = bill.Course.Name,
                Amount = bill.Amount,
                Status = bill.Status,
                PaymentMethod = bill.PaymentMethod,
                TransactionId = bill.TransactionId,
                CreateAt = bill.CreateAt,
                PaidAt = bill.PaidAt
            };
        }

        public async Task<IEnumerable<BillDto>> GetBillsByUserAsync(string userId)
        {
            return await _context.Bills
                .Where(b => b.UserId == userId)
                .Include(b => b.Course)
                .Include(b => b.User)
                .Select(b => new BillDto
                {
                    Id = b.Id,
                    UserId = b.UserId,
                    UserEmail = b.User.Email,
                    CourseId = b.CourseId,
                    CourseName = b.Course.Name,
                    Amount = b.Amount,
                    Status = b.Status,
                    PaymentMethod = b.PaymentMethod,
                    TransactionId = b.TransactionId,
                    CreateAt = b.CreateAt,
                    PaidAt = b.PaidAt
                })
                .ToListAsync();
        }
    }
}
