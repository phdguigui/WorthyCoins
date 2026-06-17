using Microsoft.AspNetCore.Identity;
using WorthyCoins.Application.Commons.Errors;
using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Infrastructure.Identity.Models;

namespace WorthyCoins.Infrastructure.Identity.Services
{
    public class AuthenticationService(UserManager<User> userManager, TokenService tokenService) : IAuthenticationService
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly TokenService _tokenService = tokenService;

        public async Task<Result<string>> LoginUserAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
                return Result<string>.Fail(ErrorCodes.InvalidCredentials);


            return Result<string>.Ok(_tokenService.Generate(user));
        }

        public async Task<Result<string>> RegisterUserAsync(string email, string password, string firstName, string lastName)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return Result<string>.Fail(ErrorCodes.PasswordMissing);
            }

            if (!password.Any(char.IsUpper))
            {
                return Result<string>.Fail(ErrorCodes.PasswordMissingUpperCase);
            }

            var user = new User
            {
                UserName = $"{firstName} {lastName}",
                Email = email,
            };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                return Result<string>.Ok(_tokenService.Generate(user));
            }

            return Result<string>.Fail(ErrorCodes.UserCreationFailed);
        }
    }
}
