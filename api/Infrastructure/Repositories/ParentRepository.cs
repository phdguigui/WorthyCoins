using Application.Interfaces.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ParentRepository : IParentRepository
    {
        private readonly WorthyCoinsDbContext _context;

        public ParentRepository(WorthyCoinsDbContext context)
        {
            _context = context;
        }

        public async Task<Parent> AddAsync(Parent entity)
        {
            await _context.Parents.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Parent?> GetByIdAsync(int id)
        {
            return await _context.Parents
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Parent> UpdateAsync(Parent entity)
        {
            _context.Parents.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _context.Parents
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync();
        }
    }
}