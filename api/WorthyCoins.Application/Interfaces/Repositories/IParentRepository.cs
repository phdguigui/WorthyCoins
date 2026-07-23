using WorthyCoins.Domain.Entities;

namespace WorthyCoins.Application.Interfaces.Repositories
{
    public interface IParentRepository
    {
        Task<Parent> AddAsync(Parent entity);
        Task<Parent?> GetByIdAsync(int id);
        Task<Parent> UpdateAsync(Parent entity);
        Task<int> DeleteAsync(int id);
        Task<Parent?> GetByUserIdAsync(string userId);
    }
}