using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using WorthyCoins.Application.Commons.Errors;
using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Application.DTOs.Requests.Parent;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Infrastructure.Identity.Models;

namespace WorthyCoins.Infrastructure.Identity.Services
{
    public class AuthenticationService(UserManager<User> userManager, TokenService tokenService, IParentService parentService) : IAuthenticationService
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly TokenService _tokenService = tokenService;
        private readonly IParentService _parentService = parentService;

        public async Task<Result<string>> LoginUserAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
                return Result<string>.Fail(ErrorCodes.InvalidCredentials);

            var parent = await _parentService.GetParentByUserIdAsync(user.Id);

            return Result<string>.Ok(_tokenService.Generate(user, parent.Id));
        }

        public async Task<Result<string>> RegisterUserAsync(string email, string password, string firstName, string lastName, string confirmPassword)
        {
            var isUsernamesValid = ValidateUsernames(firstName, lastName, email);

            if (!isUsernamesValid.Success)
            {
                return isUsernamesValid;
            }

            var isPasswordValid = await ValidatePasswordAsync(password, confirmPassword);

            if (!isPasswordValid.Success)
            {
                return isPasswordValid;
            }

            var user = new User
            {
                UserName = email.ToLower(),
                FirstName = firstName,
                LastName = lastName,
                Email = email,
            };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                var parent = await _parentService.CreateParentAsync(
                    new CreateParentRequestDto 
                    { 
                        Name = $"{user.FirstName} {user.LastName}", 
                        UserId = user.Id 
                    });
                return Result<string>.Ok(_tokenService.Generate(user, parent.Id));
            } 

            if (result.Errors.Select(x => x.Code).Contains("DuplicateUserName"))
                return Result<string>.Fail(ErrorCodes.EmailAlreadyExists);

            return Result<string>.Fail(ErrorCodes.UserCreationFailed);
        }

        private static Result<string> ValidateUsernames(string firstName, string lastName, string email)
        {
            if (string.IsNullOrWhiteSpace(firstName))
            {
                return Result<string>.Fail(ErrorCodes.FirstNameMissing);
            }
            if (string.IsNullOrWhiteSpace(lastName))
            {
                return Result<string>.Fail(ErrorCodes.LastNameMissing);
            }

            var isEmailValid = ValidateEmail(email);

            if (!isEmailValid.Success)
            {
                return isEmailValid;
            }

            return Result<string>.Ok("Usernames are valid");
        }

        private static Result<string> ValidateEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return Result<string>.Fail(ErrorCodes.EmailMissing);
            }

            var emailAttribute = new EmailAddressAttribute();

            if (!emailAttribute.IsValid(email))
            {
                return Result<string>.Fail(ErrorCodes.EmailInvalid);
            }

            return Result<string>.Ok("Email is valid");
        }

        private async Task<Result<string>> ValidatePasswordAsync(string password, string confirmPassword)
        {
            if (string.IsNullOrWhiteSpace(confirmPassword))
            {
                return Result<string>.Fail(ErrorCodes.ConfirmPasswordMissing);
            }

            if (password != confirmPassword)
            {
                return Result<string>.Fail(ErrorCodes.PasswordsDoNotMatch);
            }

            var user = new User();

            foreach (var passwordValidator in _userManager.PasswordValidators)
            {
                var validationResult = await passwordValidator.ValidateAsync(_userManager, user, password);

                if (!validationResult.Succeeded)
                {
                    return Result<string>.Fail(validationResult.Errors.First().Code);
                }
            }

            return Result<string>.Ok("Password is valid");
        }
    }
}
