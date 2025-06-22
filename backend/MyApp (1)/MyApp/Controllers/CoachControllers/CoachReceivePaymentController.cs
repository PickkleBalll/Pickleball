
using Microsoft.AspNetCore.Mvc;
using MyApp.Data;                 // ✅ Đảm bảo Payment nằm trong MyApp
using MyApp.UseCase.Payments;                 // ✅ Viết đúng theo thư mục UseCase/Payments
using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.Models.coachH;
using MyApp.Models.learneR;


namespace MyApp.Controllers.coach              // ✅ Nếu nằm trong thư mục Controllers/coach
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoachReceivePaymentController : ControllerBase
    {
        private readonly ManagePayments _managePayments;

        public CoachReceivePaymentController(ApplicationDbContext context)  // ✅ Dùng ApplicationDbContext chuẩn
        {
            _managePayments = new ManagePayments(context);
        }

        [HttpGet("{coachId}")]
        public async Task<ActionResult<List<Payment>>> GetPayments(int coachId)
        {
            return await _managePayments.ExecuteAsync(coachId);
        }
    }
}
