﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.UseCase.Learners;
using MyApp.Models.learneR;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.use_case;
namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LearnerInfoController : ControllerBase
    {
        private readonly GetAllLearnerInfos _getAllLearnerInfos;
        private readonly GetLearnersByCoachId _getLearnersByCoachId;

        public LearnerInfoController(
            GetAllLearnerInfos getAllLearnerInfos,
            GetLearnersByCoachId getLearnersByCoachId)
        {
            _getAllLearnerInfos = getAllLearnerInfos;
            _getLearnersByCoachId = getLearnersByCoachId;
        }

        // ✅ API 1: Lấy toàn bộ danh sách học viên (chỉ Admin/Coach)
        [HttpGet]
        [Authorize(Roles = "Admin,Coach")]
        public async Task<ActionResult<List<LearnerInfo>>> GetLearners()
        {
            var learners = await _getAllLearnerInfos.ExecuteAsync();
            return Ok(learners);
        }

        // ✅ API 2: Lấy danh sách học viên theo CoachId
        [HttpGet("by-coach/{coachId}")]
        [Authorize(Roles = "Coach,Admin")]
        public async Task<ActionResult<List<Learner>>> GetLearnersByCoach(string coachId)
        {
            var learners = await _getLearnersByCoachId.ExecuteAsync(coachId);
            return Ok(learners);
        }
    }
}
