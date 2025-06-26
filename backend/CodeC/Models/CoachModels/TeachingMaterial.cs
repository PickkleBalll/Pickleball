using coach.Models;

namespace MyApp.Models.coachH
{
    public class TeachingMaterial
    {
        public string Id { get; set; }
        public string Title { get; set; } = string.Empty;       // ✅ Khởi tạo mặc định để tránh null warning

        public string Description { get; set; } = string.Empty; // ✅ Khởi tạo mặc định

        public string CoachProfileId { get; set; }

        public CoachProfile CoachProfile { get; set; } = null!; // ✅ Đảm bảo không null khi EF load

        public List<Material> Materials { get; set; } = new();
    }
}