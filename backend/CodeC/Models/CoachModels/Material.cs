namespace coach.Models
{
    public enum MimeType
    {
        Pdf,
        Doc,
        Docx,
        Xls,
        Xlsx,
        Png,
        Jpeg,
        Jpg,
        Gif,
        Txt,
        Csv,
        Mp4,
        Mp3,
        Zip,
        Rar,
        Other
    }

    public class Material
    {
        public string Id { get; set; }
        public MimeType MimeType { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string Path { get; set; } = string.Empty;
        public DateTime UploadedDate { get; set; }
    }
}
