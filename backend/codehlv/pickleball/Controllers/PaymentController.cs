using Microsoft.AspNetCore.Mvc;
using pickleball.Data;
using pickleball.Models;
using pickleball.use_case.Payments;

namespace pickleball.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly ManagePayments _managePayments;

        public PaymentController(AppDbContext context)
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