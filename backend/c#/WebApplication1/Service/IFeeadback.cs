    using PickleballCourseAPI.DTOs;

    namespace PickleballCourseAPI.Services
    {
        public interface IFeedbackService
        {
            Task<IEnumerable<FeedbackDto>> GetAllFeedbacksAsync();
            Task<FeedbackDto> CreateFeedbackAsync(string userId, CreateFeedbackDto createFeedbackDto);
            Task<IEnumerable<FeedbackDto>> GetFeedbacksByCoachAsync(string coachId);
            Task<IEnumerable<FeedbackDto>> GetFeedbacksByUserAsync(string userId);
        }
    }