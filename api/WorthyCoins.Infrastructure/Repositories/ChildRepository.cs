using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace WorthyCoins.Infrastructure.Repositories
{
    public class ChildRepository : IChildRepository
    {
        private readonly WorthyCoinsDbContext _context;

        public ChildRepository(WorthyCoinsDbContext context)
        {
            _context = context;
        }

        public async Task<Child> AddAsync(Child entity)
        {
            await _context.Children.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Child?> GetByIdAsync(int id)
        {
            return await _context.Children
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<List<Child>> GetByParentIdAsync(int parentId)
        {
            return await _context.Children
                .Where(c => c.ParentId == parentId)
                .ToListAsync();
        }

        public async Task<Child> UpdateAsync(Child entity)
        {
            _context.Children.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _context.Children
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync();
        }

        public async Task<decimal> GetChildrenTotalBalanceAsync(int parentId)
        {
            return await _context.Children
                .Where(c => c.ParentId == parentId)
                .SumAsync(c => c.TotalCoins);
        }
    }
}