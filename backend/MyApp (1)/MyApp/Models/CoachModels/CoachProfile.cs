namespace coach.Models
{
    public class CoachProfile
    {
        public   string Id { get; set; }
        public required string FullName { get; set; }
        public required string Specialty { get; set; }
        public required string Email { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty; // "Male", "Female", "Other"...

        public DateTime DateOfBirth { get; set; }
    }
}