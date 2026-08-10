using WorthyCoins.Domain.Entities;

namespace WorthyCoins.Application.Interfaces.Repositories
{
    public interface ITransactionRepository
    {
        Task<List<Transaction>> GetByParentIdAsync(int parentId);
        Task<Transaction> AddAsync(Transaction entity);
    }
}