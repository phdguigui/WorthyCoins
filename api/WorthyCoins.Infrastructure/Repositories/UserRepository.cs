using Microsoft.AspNetCore.Identity;
using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Infrastructure.Identity.Models;

namespace WorthyCoins.Infrastructure.Repositories
{
    public class UserRepository(UserManager<User> userManager) : IUserRepository
    {
        private readonly UserManager<User> _userManager = userManager;

        public async Task<string> CreateUserAsync(string email, string password, string name)
        {
            var user = new User
            {
                UserName = name,
                Email = email,
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                throw new Exception("Failed to create user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return user.Id;
        }

        public async Task DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId) ?? throw new Exception("User not found");
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception("Failed to delete user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }
    }
}
