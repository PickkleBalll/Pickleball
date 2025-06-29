using coach.Models;
using MyApp.Models.learneR;
using System.ComponentModel.DataAnnotations;

public class CoachFeedback
{
    public string Id { get; set; }
    public string LearnerId { get; set; }
    public string CoachId { get; set; }
    public string CourseId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    public Learner Learner { get; set; }
    public CoursePackage Course { get; set; }
    public CoachProfile Coach { get; set; } // Nếu coach lưu trong bảng Users
}

