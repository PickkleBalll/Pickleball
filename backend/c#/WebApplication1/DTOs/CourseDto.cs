using System.ComponentModel.DataAnnotations;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.DTOs
{
    public class CourseDto
    {
        public string Id { get; set; }
        public string CoachId { get; set; }
        public string CoachName { get; set; }
        public string Name { get; set; }
        public string? Bio { get; set; }
        public string? Content { get; set; }
        public decimal Price { get; set; }
        public List<string> ListMember { get; set; } = new List<string>();
        public int MaxStudents { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public CourseStatus Status { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public int EnrolledCount { get; set; }
    }
    
    public class CreateCourseDto
    {
        [Required]
        public string Name { get; set; }
        
        public string? Bio { get; set; }
        
        public string? Content { get; set; }
        
        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        
        [Range(1, 100)]
        public int MaxStudents { get; set; } = 20;
        
        [Required]
        public DateTime StartDate { get; set; }
        
        [Required]
        public DateTime EndDate { get; set; }
    }
    
    public class UpdateCourseDto
    {
        public string? Name { get; set; }
        public string? Bio { get; set; }
        public string? Content { get; set; }
        public decimal? Price { get; set; }
        public int? MaxStudents { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public CourseStatus? Status { get; set; }
    }
    
    public class EnrollCourseDto
    {
        [Required]
        public string CourseId { get; set; }
    }
}