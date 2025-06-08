namespace pickleball.Models
{
    public class Ranking
    {
        public int Id { get; set; }
        public int CoachProfileId { get; set; }
        public CoachProfile CoachProfile { get; set; }
        public double Score { get; set; }
        public string Comment { get; set; }
    }
}