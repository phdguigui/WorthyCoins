using Microsoft.AspNetCore.Identity;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Infrastructure.Identity.Models;

namespace WorthyCoins.Infrastructure.Identity.Services
{
    public class AuthenticationService(UserManager<User> userManager, TokenService tokenService) : IAuthenticationService
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly TokenService _tokenService = tokenService;

        public async Task<string?> LoginUserAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
                return null;

            return _tokenService.Generate(user);
        }
    }
}
