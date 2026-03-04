using Application.DTOs.Responses.Transaction;
using Application.Interfaces;
using Application.Interfaces.Repositories;

namespace Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository;

        public TransactionService(ITransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<TransactionResponseDto>> GetTransactionsAsync(int parentId)
        {
            var entities = await _repository.GetByParentIdAsync(parentId);

            return entities.Select(x => new TransactionResponseDto
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