namespace WorthyCoins.Application.DTOs.Requests.Parent
{
    public class CreateParentRequestDto
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
