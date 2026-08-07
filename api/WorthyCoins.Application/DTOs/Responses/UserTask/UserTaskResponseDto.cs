using WorthyCoins.Application.DTOs.Responses.Child;
using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.Application.DTOs.Responses.UserTask
{
    public class UserTaskResponseDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int AssignedChildId { get; set; }
        public decimal RewardAmount { get; set; }
        public UserTaskStatusEnum Status { get; set; }
        public required string Icon { get; set; }
        public required string Color { get; set; }
        public virtual ChildResponseDto? AssignedChild { get; set; }
    }
}
