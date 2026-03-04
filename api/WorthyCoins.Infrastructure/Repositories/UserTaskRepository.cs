using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<UserTask>> GetByParentIdAsync(int parentId)
        {
            return await _context.UserTasks
                .AsNoTracking()
                .Include(x => x.AssignedChild)
                .Where(x => x.AssignedChild!.ParentId == parentId)
                .ToListAsync();
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