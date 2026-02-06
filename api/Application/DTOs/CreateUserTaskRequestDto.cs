namespace Application.DTOs
{
    public class CreateUserTaskRequestDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public int AssignedChildId { get; set; }
        public decimal RewardAmout { get; set; }
    }
}
