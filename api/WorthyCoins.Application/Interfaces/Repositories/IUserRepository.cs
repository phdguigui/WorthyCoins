namespace WorthyCoins.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        public Task<(string? firstName, string? lastName)> GetUserNamesAsync(string userId);
        public Task<(string userId, string token)> CreateUserAsync(string email, string password, string name);
        public Task DeleteUserAsync(string userId);
    }
}
