namespace Domain.Entities
{
    public class Child
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public float TotalCoins { get; set; }
        public virtual ICollection<Task>? Tasks { get; set; }
    }
}
