using Domain.Entities;

namespace Application.Interfaces.Repositories
{
    public interface ITransactionRepository
    {
        Task<List<Transaction>> GetByParentIdAsync(int parentId);
    }
}