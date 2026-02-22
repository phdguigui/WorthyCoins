using Application.DTOs.Responses.Transaction;

namespace Application.Interfaces
{
    public interface ITransactionService
    {
        public Task<List<TransactionResponseDto>> GetTransactionsAsync(int parentId);
    }
}
