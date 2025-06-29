using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PickleballCourseAPI.DTOs;
using PickleballCourseAPI.Services;
using System.Security.Claims;

namespace PickleballCourseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        /// <summary>
        /// Lấy tất cả khóa học (mọi vai trò đều có thể xem)
        /// </summary>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseService.GetAllCoursesAsync();
            return Ok(courses);
        }

        /// <summary>
        /// Lấy chi tiết khóa học theo ID
        /// </summary>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCourseById(string id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            if (course == null) return NotFound();
            return Ok(course);
        }

        /// <summary>
        /// Tạo khóa học mới (chỉ Admin mới được phép tạo)
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCourse([FromBody] CreateCourseDto dto)
        {
            var coachId = User.FindFirstValue("userId");
            var course = await _courseService.CreateCourseAsync(coachId, dto);
            return Ok(course);
        }

        /// <summary>
        /// Cập nhật khóa học (chỉ Admin mới được sửa)
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCourse(string id, [FromBody] UpdateCourseDto dto)
        {
            var course = await _courseService.UpdateCourseAsync(id, dto);
            return Ok(course);
        }

        /// <summary>
        /// Học viên đăng ký khóa học (chỉ student mới đăng ký được)
        /// </summary>
        [HttpPost("enroll")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> EnrollInCourse([FromBody] EnrollCourseDto dto)
        {
            var userId = User.FindFirstValue("userId");

            try
            {
                var result = await _courseService.EnrollInCourseAsync(userId, dto.CourseId);
                return Ok(new { message = "Đăng ký thành công", enrolled = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Coach xem tất cả khóa học của mình
        /// </summary>
        [HttpGet("my-coach-courses")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetCoursesByCoach()
        {
            var coachId = User.FindFirstValue("userId");
            var courses = await _courseService.GetCoursesByCoachAsync(coachId);
            return Ok(courses);
        }

        /// <summary>
        /// Học viên xem danh sách khóa học đã đăng ký
        /// </summary>
        [HttpGet("my-enrolled")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetEnrolledCourses()
        {
            var userId = User.FindFirstValue("userId");
            var courses = await _courseService.GetEnrolledCoursesAsync(userId);
            return Ok(courses);
        }
    }
}
