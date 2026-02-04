namespace Domain.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime DueDate { get; set; }
        public int AssignedChildId { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsCanceled { get; set; }
        public float RewardAmout { get; set; }
        public required virtual Child AssignedChild { get; set; }
    }
}
