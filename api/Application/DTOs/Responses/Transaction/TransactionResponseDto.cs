using Domain.Enumerators;

namespace Application.DTOs.Responses.Transaction
{
    public class TransactionResponseDto
    {
        public int Id { get; set; }
        public TransactionTypeEnum TransactionType { get; set; }
        public int ChildId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string? Description { get; set; }
    }
}
