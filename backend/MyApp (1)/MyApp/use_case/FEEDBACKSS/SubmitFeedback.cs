//using MyApp.use_case.Feedbackss;
//using coach.Models;
//using MyApp.Data;
//using System.Threading.Tasks;
//using MyApp.Models.learneR;

//namespace MyApp.use_case.Feedbackss
//{
//    public class SubmitFeedback
//    {
//        private readonly ApplicationDbContext _context;

//        public SubmitFeedback(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<Feedbacks> ExecuteAsync(Feedbacks feedback)
//        {
//            _context.Feedbacks.Add(feedback);
//            await _context.SaveChangesAsync();
//            return feedback;
//        }
//    }
//}
