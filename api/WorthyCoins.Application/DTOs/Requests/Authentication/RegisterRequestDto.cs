namespace WorthyCoins.Application.DTOs.Requests.Authentication
{
    public record RegisterRequestDto(string FirstName, string LastName, string Email, string Password, string ConfirmPassword);
}