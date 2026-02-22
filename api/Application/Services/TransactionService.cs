using Application.DTOs.Responses.Transaction;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly WorthyCoinsDbContext _context;
        public TransactionService(WorthyCoinsDbContext context)
        {
            _context = context;
        }
        public async Task<List<TransactionResponseDto>> GetTransactionsAsync(int parentId)
        {
            var entity = await _context.Transactions
                .AsNoTracking()
                .Include(x => x.Child)
                .Where(x => x.Child.ParentId == parentId)
                .ToListAsync();

            return entity.Select(x => new TransactionResponseDto
            {
                Id = x.Id,
                TransactionType = x.TransactionType,
                ChildId = x.ChildId,
                Amount = x.Amount,
                TransactionDate = x.TransactionDate,
                Description = x.Description
            }).ToList();
        }
    }
}
