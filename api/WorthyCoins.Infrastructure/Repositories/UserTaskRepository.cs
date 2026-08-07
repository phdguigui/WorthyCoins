using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using WorthyCoins.Domain.Enumerators;
using WorthyCoins.Application.Commons.Results;

namespace WorthyCoins.Infrastructure.Repositories
{
    public class UserTaskRepository : IUserTaskRepository
    {
        private readonly WorthyCoinsDbContext _context;

        public UserTaskRepository(WorthyCoinsDbContext context)
        {
            _context = context;
        }

        public async Task<UserTask> AddAsync(UserTask entity)
        {
            await _context.UserTasks.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<UserTask?> GetByIdAsync(int id)
        {
            return await _context.UserTasks
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<UserTask>> GetByChildIdAsync(int childId)
        {
            return await _context.UserTasks
                .AsNoTracking()
                .Where(x => x.AssignedChildId == childId)
                .ToListAsync();
        }

        public async Task<PagedResult<UserTask>> GetByParentIdAsync(int parentId, UserTaskStatusEnum? status, int? childId, DateTime? dueDate, int pageNumber = 1, int pageSize = 10)
        {
            var query = _context.UserTasks.AsNoTracking()
                .Include(x => x.AssignedChild)
                .Where(x => x.AssignedChild!.ParentId == parentId);

            if (status.HasValue)
                query = query.Where(x => x.Status == status.Value);

            if (childId.HasValue)
                query = query.Where(x => x.AssignedChildId == childId.Value);

            if (dueDate.HasValue)
                query = query.Where(x => x.DueDate.HasValue && x.DueDate.Value.Date == dueDate.Value.Date);

            var total = await query.LongCountAsync();

            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<UserTask>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = total
            };
        }

        public async Task<UserTask> UpdateAsync(UserTask entity)
        {
            _context.UserTasks.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _context.UserTasks
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync();
        }
    }
}