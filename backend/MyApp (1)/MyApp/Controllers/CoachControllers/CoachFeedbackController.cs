
//using Microsoft.AspNetCore.Mvc;
//using MyApp.Data;
//using MyApp.Models.learneR;
//using MyApp.Models.coachH;
//using MyApp.use_case.Feedbackss;
// // ✅ Đảm bảo thư mục đúng là: MyApp/UseCase/Feedbacks/
//using System.Threading.Tasks;

//namespace MyApp.Controllers.MyApp
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class CoachFeedbackController : ControllerBase
//    {
//        private readonly SubmitFeedback _submitFeedback;

//        public CoachFeedbackController(ApplicationDbContext context)
//        {
//            _submitFeedback = new SubmitFeedback(context);
//        }

//		[HttpPost("submit")]
//		public async Task<ActionResult<Feedbacks>> Submit([FromBody] Feedbacks feedback)
//		{
//			var result = await _submitFeedback.ExecuteAsync(feedback);
//			return CreatedAtAction(nameof(Submit), new { id = result.Id }, result);
//		}
//	}
//}
