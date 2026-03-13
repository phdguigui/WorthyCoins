namespace WorthyCoins.Application.Interfaces
{
    public interface IAuthenticationService
    {
        public Task<string?> LoginUserAsync(string email, string password);
    }
}
