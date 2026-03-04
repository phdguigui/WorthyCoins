using WorthyCoins.Application.DTOs.Responses.Transaction;

namespace WorthyCoins.Application.Interfaces
{
    public interface ITransactionService
    {
        public Task<List<TransactionResponseDto>> GetTransactionsAsync(int parentId);
    }
}
