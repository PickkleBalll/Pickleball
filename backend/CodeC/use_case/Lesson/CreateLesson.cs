﻿//using MyApp.Data;
//using coach.Models;
//using Microsoft.EntityFrameworkCore;

//namespace coach.use_case.Lesson
//{
//    public class CreateLesson
//    {
//        private readonly ApplicationDbContext _context;

//        public CreateLesson(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<Models.Lesson?> ExecuteAsync(Models.Lesson lesson)
//        {
           
//            var coach = await _context.CoachProfiles.FindAsync(lesson.CoachProfileId);
//            if (coach == null)
//            {
               
//                return null;
//            }

           
//            lesson.CoachProfile = coach;

           
//            _context.Lessons.Add(lesson);
//            await _context.SaveChangesAsync();

           
//            return lesson;
//        }
//    }
//}
