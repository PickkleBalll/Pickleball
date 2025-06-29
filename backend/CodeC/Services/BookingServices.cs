using MyApp.Data;
using MyApp.Models.learneR;
using MyApp.Models; // Để dùng Notification
using Microsoft.EntityFrameworkCore;

public class BookingServices
{
    private readonly ApplicationDbContext _context;

    public BookingServices(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Booking> RegisterCourse(Booking booking)
    {
        var exists = await _context.Bookings.AnyAsync(b =>
            b.LearnerId == booking.LearnerId && b.CourseId == booking.CourseId);

        if (exists)
            throw new Exception("Bạn đã đăng ký gói học này rồi.");

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        // ✅ Gửi thông báo cho Learner
        _context.Notifications.Add(new Notification
        {
            UserId = booking.LearnerId,
            Role = "Learner",
            Title = "Đăng ký thành công",
            Message = $"Bạn đã đăng ký khóa học [{booking.CourseId}] thành công."
        });

        // ✅ Gửi thông báo cho tất cả Admin
        var admins = await _context.Admins.ToListAsync();
        foreach (var admin in admins)
        {
            _context.Notifications.Add(new Notification
            {
                UserId = admin.Id,
                Role = "Admin",
                Title = "Học viên đăng ký mới",
                Message = $"Học viên {booking.LearnerId} vừa đăng ký khóa học [{booking.CourseId}]."
            });
        }

        await _context.SaveChangesAsync();
        return booking;
    }

    public async Task<Booking> RegisterCourseAuto(string learnerId)
    {
        var course = await _context.CoursePackages.FirstOrDefaultAsync();
        if (course == null)
            throw new Exception("Chưa có gói học nào.");

        var exists = await _context.Bookings.AnyAsync(b =>
            b.LearnerId == learnerId && b.CourseId == course.PackageId);

        if (exists)
            throw new Exception("Bạn đã đăng ký gói học này rồi.");

        var booking = new Booking
        {
            Id = Guid.NewGuid().ToString(),
            LearnerId = learnerId,
            CourseId = course.PackageId,
            RegistrationDate = DateTime.UtcNow,
            IsPaid = false
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        // ✅ Gửi thông báo cho Learner
        _context.Notifications.Add(new Notification
        {
            UserId = learnerId,
            Role = "Learner",
            Title = "Đăng ký thành công",
            Message = $"Bạn đã đăng ký gói học [{course.PackageId}] thành công."
        });

        // ✅ Gửi thông báo cho tất cả Admin
        var admins = await _context.Admins.ToListAsync();
        foreach (var admin in admins)
        {
            _context.Notifications.Add(new Notification
            {
                UserId = admin.Id,
                Role = "Admin",
                Title = "Học viên đăng ký mới",
                Message = $"Học viên {learnerId} vừa đăng ký gói học [{course.PackageId}]."
            });
        }

        await _context.SaveChangesAsync();
        return booking;
    }

    public async Task<Payment?> AddPayment(string bookingId, decimal amount, string method, string transactionId)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null) return null;

        var payment = new Payment
        {
            BookingId = bookingId,
            Amount = amount,
            PaymentMethod = method,
            TransactionId = transactionId,
            IsSuccess = true
        };

        booking.IsPaid = true;

        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();
        return payment;
    }

    public async Task<List<Booking>> GetPaidBookingsByUser(string learnerId)
    {
        return await _context.Bookings
            .Include(b => b.Course)
            .Where(b => b.LearnerId == learnerId && b.IsPaid)
            .ToListAsync();
    }

    public async Task<List<Booking>> GetBookingsByUser(string learnerId)
    {
        return await _context.Bookings
            .Include(b => b.Course)
            .Where(b => b.LearnerId == learnerId)
            .ToListAsync();
    }

    public async Task<List<Payment>> GetUserPayments(string learnerId)
    {
        return await _context.Payments
            .Include(p => p.Booking)
            .Where(p => p.Booking.LearnerId == learnerId)
            .OrderByDescending(p => p.PaidAt)
            .ToListAsync();
    }

    public async Task<List<Booking>> GetBookingsWithDetailsByLearnerId(string learnerId)
    {
        return await _context.Bookings
            .Include(b => b.Course)
            .Include(b => b.CoachProfile)
            .Where(b => b.LearnerId == learnerId)
            .ToListAsync();
    }
    public async Task<Booking> RegisterCourse(string learnerId, string courseId)
    {
        var learner = await _context.Learners.FindAsync(learnerId);
        if (learner == null)
            throw new Exception("Learner không tồn tại.");

        var course = await _context.CoursePackages.FindAsync(courseId);
        if (course == null)
            throw new Exception("Course không tồn tại.");

        var existing = await _context.Bookings
            .FirstOrDefaultAsync(b => b.LearnerId == learnerId && b.CourseId == courseId);

        if (existing != null)
            throw new Exception("Học viên đã đăng ký khóa học này.");

        // 🟢 Gán luôn CoachId từ khóa học
        var booking = new Booking
        {
            Id = Guid.NewGuid().ToString(),
            LearnerId = learnerId,
            CourseId = courseId,
            RegistrationDate = DateTime.UtcNow,
            IsPaid = false,
            CoachId = course.CoachId // ✅ Gán ở đây
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return booking;
    }

    public async Task<Payment?> AddPayment(string bookingId, decimal amount, string method, string transactionId, string currentUserId)
    {
        var booking = await _context.Bookings
            .Include(b => b.Learner)
            .FirstOrDefaultAsync(b => b.Id == bookingId);

        if (booking == null)
            return null;

        // 🔐 Kiểm tra: currentUserId là UserId (từ token), cần so với Learner.UserId
        if (booking.Learner == null || booking.Learner.UserId != currentUserId)
            throw new Exception("Bạn không có quyền thanh toán booking này.");

        var payment = new Payment
        {
            BookingId = bookingId,
            Amount = amount,
            PaymentMethod = method,
            TransactionId = transactionId,
            IsSuccess = true,
            PaidAt = DateTime.UtcNow
        };

        booking.IsPaid = true;

        _context.Payments.Add(payment);

        // ✅ Gửi thông báo đến tất cả admin
        var admins = await _context.Admins.ToListAsync();
        foreach (var admin in admins)
        {
            _context.Notifications.Add(new Notification
            {
                UserId = admin.Id,
                Role = "Admin",
                Title = "Thanh toán mới",
                Message = $"Học viên {booking.LearnerId} đã thanh toán khóa học [{booking.Course?.Title ?? booking.CourseId}] với số tiền {amount:N0} VNĐ.",
                CreatedAt = DateTime.UtcNow
            });
        }

        await _context.SaveChangesAsync();
        return payment;
    }

}
