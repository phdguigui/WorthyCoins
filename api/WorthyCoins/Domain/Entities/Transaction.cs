using Shared.Enumerators;

namespace Domain.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public TransactionTypeEnum TransactionType { get; set; }
        public int ChildId { get; set; }
        public float Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string? Description { get; set; }
        public required virtual Child Child { get; set; }
    }
}
