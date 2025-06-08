namespace PICKLEBALL.Model
{
    public class User
    {
        public int Id { get; set; } //ID ?
        public string LearnerCode { get; set; } = string.Empty; //ma cua hoc vien
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool IsActive { get; set; } //trang thai hoat dong
    }
}
