using Microsoft.AspNetCore.Mvc;
using coach.Data;
using coach.Models;
using coach.use_case.Payments;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace coach.Controllers
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