using WorthyCoins.Domain.Entities;

namespace WorthyCoins.Application.Interfaces.Repositories
{
    public interface IChildRepository
    {
        public Task<Child> AddAsync(Child entity);
        public Task<Child> GetByIdAsync(int id);
        public Task<List<Child>> GetByParentIdAsync(int id);
        public Task<Child> UpdateAsync(Child entity);
        public Task<int> DeleteAsync(int id);

        public Task<decimal> GetChildrenTotalBalanceAsync(int parentId);
    }
}
