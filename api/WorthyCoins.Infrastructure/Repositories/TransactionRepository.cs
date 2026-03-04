using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace WorthyCoins.Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly WorthyCoinsDbContext _context;

        public TransactionRepository(WorthyCoinsDbContext context)
        {
            _context = context;
        }

        public async Task<List<Transaction>> GetByParentIdAsync(int parentId)
        {
            return await _context.Transactions
                .AsNoTracking()
                .Include(x => x.Child)
                .Where(x => x.Child.ParentId == parentId)
                .ToListAsync();
        }
    }
}