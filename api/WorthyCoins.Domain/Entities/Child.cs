namespace WorthyCoins.Domain.Entities
{
    public class Child
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public decimal TotalCoins { get; set; }
        public int ParentId { get; set; }
        public required string Icon { get; set; }
        public required string Color { get; set; }
        public virtual ICollection<UserTask>? Tasks { get; set; }
        public virtual Parent? Parent { get; set; }
        public virtual ICollection<Transaction>? Transactions { get; set; }
    }
}
