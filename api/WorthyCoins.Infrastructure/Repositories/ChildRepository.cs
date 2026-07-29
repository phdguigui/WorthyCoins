using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using WorthyCoins.Application.Commons.Results;

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

        public async Task<PagedResult<Child>> GetByParentIdAsync(int parentId, int pageNumber = 1, int pageSize = 10)
        {
            var query = _context.Children.AsNoTracking()
                .Where(c => c.ParentId == parentId);

            var total = await query.LongCountAsync();

            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<Child>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = total
            };
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