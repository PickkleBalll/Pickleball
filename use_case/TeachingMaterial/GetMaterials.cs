using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pickleball.Data;
using pickleball.Models;

namespace pickleball.use_case.TeachingMaterials
{
    public class GetMaterials
    {
        private readonly AppDbContext _context;

        public GetMaterials(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TeachingMaterial>> ExecuteAsync()
        {
            return await _context.TeachingMaterials.ToListAsync();
        }
    }
}
