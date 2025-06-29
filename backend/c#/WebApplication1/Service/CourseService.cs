using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PickleballCourseAPI.Data;
using PickleballCourseAPI.DTOs;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.Services
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;

        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CourseDto>> GetAllCoursesAsync()
        {
            var courses = await _context.Courses
                .Include(c => c.Coach)
                .ToListAsync();

            var result = new List<CourseDto>();

            foreach (var course in courses)
            {
                var members = JsonConvert.DeserializeObject<List<string>>(course.ListMember) ?? new List<string>();

                result.Add(new CourseDto
                {
                    Id = course.Id,
                    CoachId = course.CoachId,
                    //CoachName = course.Coach.Fullname,
                    Name = course.Name,
                    Bio = course.Bio,
                    Content = course.Content,
                    Price = course.Price,
                    MaxStudents = course.MaxStudents,
                    StartDate = course.StartDate,
                    EndDate = course.EndDate,
                    Status = course.Status,
                    CreateAt = course.CreateAt,
                    UpdateAt = course.UpdateAt,
                    ListMember = members,
                    EnrolledCount = members.Count
                });
            }

            return result;
        }

        public async Task<CourseDto?> GetCourseByIdAsync(string id)
        {
            var course = await _context.Courses
                .Include(c => c.Coach)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null) return null;

            var members = JsonConvert.DeserializeObject<List<string>>(course.ListMember) ?? new List<string>();

            return new CourseDto
            {
                Id = course.Id,
                CoachId = course.CoachId,
                //CoachName = course.Coach.Fullname,
                Name = course.Name,
                Bio = course.Bio,
                Content = course.Content,
                Price = course.Price,
                MaxStudents = course.MaxStudents,
                StartDate = course.StartDate,
                EndDate = course.EndDate,
                Status = course.Status,
                CreateAt = course.CreateAt,
                UpdateAt = course.UpdateAt,
                ListMember = members,
                EnrolledCount = members.Count
            };
        }

        public async Task<CourseDto> CreateCourseAsync(string coachId, CreateCourseDto dto)
        {
            var coach = await _context.Users.FindAsync(coachId);
            if (coach == null) throw new Exception("Coach not found");

            var course = new Course
            {
                Id = Guid.NewGuid().ToString(),
                CoachId = coachId,
                Name = dto.Name,
                Bio = dto.Bio,
                Content = dto.Content,
                Price = dto.Price,
                MaxStudents = dto.MaxStudents,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = CourseStatus.Active,
                CreateAt = DateTime.UtcNow,
                UpdateAt = DateTime.UtcNow,
                ListMember = JsonConvert.SerializeObject(new List<string>())
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return await GetCourseByIdAsync(course.Id) ?? throw new Exception("Failed to create course");
        }

        public async Task<CourseDto> UpdateCourseAsync(string id, UpdateCourseDto dto)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) throw new Exception("Course not found");

            course.Name = dto.Name ?? course.Name;
            course.Bio = dto.Bio ?? course.Bio;
            course.Content = dto.Content ?? course.Content;
            course.Price = dto.Price ?? course.Price;
            course.MaxStudents = dto.MaxStudents ?? course.MaxStudents;
            course.StartDate = dto.StartDate ?? course.StartDate;
            course.EndDate = dto.EndDate ?? course.EndDate;
            course.Status = dto.Status ?? course.Status;
            course.UpdateAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetCourseByIdAsync(id) ?? throw new Exception("Update failed");
        }

        public async Task<bool> EnrollInCourseAsync(string userId, string courseId)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == courseId);
            if (course == null) throw new Exception("Course not found");

            var members = JsonConvert.DeserializeObject<List<string>>(course.ListMember) ?? new List<string>();

            if (members.Contains(userId))
                throw new Exception("User already enrolled");

            if (members.Count >= course.MaxStudents)
                throw new Exception("Course is full");

            members.Add(userId);
            course.ListMember = JsonConvert.SerializeObject(members);
            course.UpdateAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CourseDto>> GetCoursesByCoachAsync(string coachId)
        {
            var courses = await _context.Courses
                .Where(c => c.CoachId == coachId)
                .Include(c => c.Coach)
                .ToListAsync();

            var result = new List<CourseDto>();

            foreach (var course in courses)
            {
                var members = JsonConvert.DeserializeObject<List<string>>(course.ListMember) ?? new List<string>();

                result.Add(new CourseDto
                {
                    Id = course.Id,
                    CoachId = course.CoachId,
                    //CoachName = course.Coach.Fullname,
                    Name = course.Name,
                    Bio = course.Bio,
                    Content = course.Content,
                    Price = course.Price,
                    MaxStudents = course.MaxStudents,
                    StartDate = course.StartDate,
                    EndDate = course.EndDate,
                    Status = course.Status,
                    CreateAt = course.CreateAt,
                    UpdateAt = course.UpdateAt,
                    ListMember = members,
                    EnrolledCount = members.Count
                });
            }

            return result;
        }

        public async Task<IEnumerable<CourseDto>> GetEnrolledCoursesAsync(string userId)
        {
            var courses = await _context.Courses
                .Include(c => c.Coach)
                .ToListAsync();

            var result = new List<CourseDto>();

            foreach (var course in courses)
            {
                var members = JsonConvert.DeserializeObject<List<string>>(course.ListMember) ?? new List<string>();
                if (members.Contains(userId))
                {
                    result.Add(new CourseDto
                    {
                        Id = course.Id,
                        CoachId = course.CoachId,
                        //CoachName = course.Coach.Fullname,
                        Name = course.Name,
                        Bio = course.Bio,
                        Content = course.Content,
                        Price = course.Price,
                        MaxStudents = course.MaxStudents,
                        StartDate = course.StartDate,
                        EndDate = course.EndDate,
                        Status = course.Status,
                        CreateAt = course.CreateAt,
                        UpdateAt = course.UpdateAt,
                        ListMember = members,
                        EnrolledCount = members.Count
                    });
                }
            }

            return result;
        }
    }
}
