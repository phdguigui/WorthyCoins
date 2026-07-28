using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using WorthyCoins.Domain.Enumerators;

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

        public async Task<List<UserTask>> GetByParentIdAsync(int parentId, UserTaskStatusEnum? status, int? childId, DateTime? dueDate)
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

            return await query.ToListAsync();
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