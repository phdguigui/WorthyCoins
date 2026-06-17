using WorthyCoins.Application.Commons.Results;

namespace WorthyCoins.Application.Interfaces
{
    public interface IAuthenticationService
    {
        public Task<Result<string>> LoginUserAsync(string email, string password);
        public Task<Result<string>> RegisterUserAsync(string email, string password, string firstName, string lastName);
    }
}
