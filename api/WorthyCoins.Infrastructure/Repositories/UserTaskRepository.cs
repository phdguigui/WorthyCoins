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

        public async Task<PagedResult<UserTask>> GetByParentIdAsync(
            int parentId,
            UserTaskStatusEnum? status,
            int? childId,
            DateTime? dueDate,
            string? search = null,
            string? dueDateSort = null,
            string? filterType = null,
            int pageNumber = 1,
            int pageSize = 10)
        {
            var query = _context.UserTasks.AsNoTracking()
                .Include(x => x.AssignedChild)
                .Where(x => x.AssignedChild!.ParentId == parentId);

            if (childId.HasValue)
                query = query.Where(x => x.AssignedChildId == childId.Value);

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(x => x.Title.Contains(search, StringComparison.CurrentCultureIgnoreCase));

            var targetDate = dueDate.HasValue ? DateTime.SpecifyKind(dueDate.Value.Date, DateTimeKind.Utc) : DateTime.UtcNow.Date;

            if (!string.IsNullOrWhiteSpace(filterType))
            {
                var now = DateTime.UtcNow;

                switch (filterType.ToLowerInvariant())
                {
                    case "today_all":
                        query = query.Where(x => x.DueDate.HasValue && x.DueDate.Value.Date == targetDate);
                        query = query.OrderBy(x => x.Status).ThenBy(x => x.DueDate);
                        break;

                    case "today_pending":
                        query = query.Where(x => x.DueDate.HasValue && x.DueDate.Value.Date == targetDate && x.Status == UserTaskStatusEnum.Pending);
                        query = query.OrderBy(x => x.DueDate);
                        break;

                    case "today_completed":
                        query = query.Where(x => x.DueDate.HasValue && x.DueDate.Value.Date == targetDate && x.Status == UserTaskStatusEnum.Completed);
                        query = query.OrderBy(x => x.DueDate);
                        break;

                    case "all_pending":
                        query = query.Where(x => x.Status == UserTaskStatusEnum.Pending);
                        query = query.OrderByDescending(x => x.DueDate.HasValue).ThenBy(x => x.DueDate);
                        break;

                    case "all_completed":
                        query = query.Where(x => x.Status == UserTaskStatusEnum.Completed);
                        query = query.OrderByDescending(x => x.DueDate.HasValue).ThenBy(x => x.DueDate);
                        break;

                    case "overdue":
                        query = query.Where(x => x.Status == UserTaskStatusEnum.Pending && x.DueDate.HasValue && x.DueDate.Value.Date < targetDate);
                        query = query.OrderBy(x => x.DueDate);
                        break;
                }

                if (!filterType.Contains("today", StringComparison.CurrentCultureIgnoreCase))
                {
                    if (dueDate.HasValue)
                        query = query.Where(x => x.DueDate.HasValue && x.DueDate.Value.Date == targetDate);
                }
            }

            if (dueDateSort == "asc")
            {
                query = query.OrderByDescending(x => x.DueDate.HasValue).ThenBy(x => x.DueDate);
            }
            else if (dueDateSort == "desc")
            {
                query = query.OrderByDescending(x => x.DueDate.HasValue).ThenByDescending(x => x.DueDate);
            }

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