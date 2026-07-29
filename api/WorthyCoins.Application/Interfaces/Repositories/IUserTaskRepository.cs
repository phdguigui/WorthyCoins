using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Domain.Entities;
using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.Application.Interfaces.Repositories
{
    public interface IUserTaskRepository
    {
        Task<UserTask> AddAsync(UserTask entity);
        Task<UserTask?> GetByIdAsync(int id);
        Task<List<UserTask>> GetByChildIdAsync(int childId);
        Task<PagedResult<UserTask>> GetByParentIdAsync(int parentId, UserTaskStatusEnum? status, int? childId, DateTime? dueDate, int pageNumber = 1, int pageSize = 10);
        Task<UserTask> UpdateAsync(UserTask entity);
        Task<int> DeleteAsync(int id);
    }
}