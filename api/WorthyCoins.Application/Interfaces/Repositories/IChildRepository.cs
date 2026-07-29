using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Domain.Entities;

namespace WorthyCoins.Application.Interfaces.Repositories
{
    public interface IChildRepository
    {
        public Task<Child> AddAsync(Child entity);
        public Task<Child> GetByIdAsync(int id);
        public Task<PagedResult<Child>> GetByParentIdAsync(int parentId, int pageNumber = 1, int pageSize = 10);
        public Task<Child> UpdateAsync(Child entity);
        public Task<int> DeleteAsync(int id);

        public Task<decimal> GetChildrenTotalBalanceAsync(int parentId);
    }
}
