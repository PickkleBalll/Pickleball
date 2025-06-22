using coach.Models;
using System;

namespace MyApp.Models.coachH
{
    public class StudentProgress
    {
        public int Id { get; set; }
        public int StudentId { get; set; }

        public string StudentName { get; set; } = string.Empty;

        public string ProgressNote { get; set; } = string.Empty;

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public int LessonId { get; set; }

        public Lesson Lesson { get; set; } = null!;
    }
}