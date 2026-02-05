namespace Domain.Entities
{
    public class Parent
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public virtual ICollection<Child>? Children { get; set; }
    }
}
