using System;
namespace pickleball.Models
{
    public class TeachingMaterial
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CoachProfileId { get; set; }
        public CoachProfile CoachProfile { get; set; }
    }
}