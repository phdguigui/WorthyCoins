namespace WorthyCoins.Application.DTOs.Requests.Child
{
    public class UpdateChildRequestDto
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Icon { get; set; }
        public string? Color { get; set; }
    }
}
