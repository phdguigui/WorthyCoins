using WorthyCoins.Domain.Entities;
using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.Application.Interfaces.Repositories
{
    public interface IUserTaskRepository
    {
        Task<UserTask> AddAsync(UserTask entity);
        Task<UserTask?> GetByIdAsync(int id);
        Task<List<UserTask>> GetByChildIdAsync(int childId);
        Task<List<UserTask>> GetByParentIdAsync(int parentId, UserTaskStatusEnum? status, int? childId, DateTime? dueDate);
        Task<UserTask> UpdateAsync(UserTask entity);
        Task<int> DeleteAsync(int id);
    }
}