namespace WorthyCoins.Domain.Entities
{
    public class Parent
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string UserId { get; set; }
        public ICollection<Child> Children { get; set; } = [];
    }
}
