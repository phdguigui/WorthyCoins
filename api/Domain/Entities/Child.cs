namespace Domain.Entities
{
    public class Child
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public decimal TotalCoins { get; set; }
        public virtual ICollection<UserTask>? Tasks { get; set; }
    }
}
