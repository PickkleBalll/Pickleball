namespace PICKLEBALL.Model
{
    public class Video
    {
        public int Id { get; set; } //ID ?
        public int UserId { get; set; } //ID cua hoc vien
        public string FilePath { get; set; } = string.Empty;
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public string? Description { get; set; }
    }
}
