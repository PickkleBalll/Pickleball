namespace MyApp.Dto
{
    public class LearnerCreateDto
    {
        public string UserId { get; set; } = string.Empty;  // thêm dòng này
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
    }
}
