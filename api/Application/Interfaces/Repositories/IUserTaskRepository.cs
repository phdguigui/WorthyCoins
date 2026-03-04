using Domain.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IUserTaskRepository
    {
        Task<UserTask> AddAsync(UserTask entity);
        Task<UserTask?> GetByIdAsync(int id);
        Task<List<UserTask>> GetByChildIdAsync(int childId);
        Task<List<UserTask>> GetByParentIdAsync(int parentId);
        Task<UserTask> UpdateAsync(UserTask entity);
        Task<int> DeleteAsync(int id);
    }
}