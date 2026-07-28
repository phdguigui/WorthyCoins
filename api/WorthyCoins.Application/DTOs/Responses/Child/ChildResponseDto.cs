namespace WorthyCoins.Application.DTOs.Responses.Child
{
    public class ChildResponseDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public decimal TotalCoins { get; set; }
    }
}
