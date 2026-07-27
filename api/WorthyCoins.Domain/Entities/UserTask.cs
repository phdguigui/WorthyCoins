using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.Domain.Entities
{
    public class UserTask
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int AssignedChildId { get; set; }
        public decimal RewardAmount { get; set; }
        public UserTaskStatusEnum Status { get; set; }
        public virtual Child? AssignedChild { get; set; }
    }
}
