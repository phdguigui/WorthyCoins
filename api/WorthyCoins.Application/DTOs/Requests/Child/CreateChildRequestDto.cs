namespace WorthyCoins.Application.DTOs.Requests.Child
{
    public class CreateChildRequestDto
    {
        public required string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public required int ParentId { get; set; }
    }
}
