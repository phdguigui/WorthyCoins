using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WorthyCoins.Application.DTOs.Requests.Authentication;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.API.Resources.Errors;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController(IAuthenticationService service, IStringLocalizer<Error> localizer) : ControllerBase
    {
        private readonly IAuthenticationService _service = service;
        private readonly IStringLocalizer<Error> _localizer = localizer;

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDto request)
        {
            var result = await _service.LoginUserAsync(request.Email, request.Password);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return Unauthorized(result);
            }

            return Ok(result);
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] RegisterRequestDto request)
        {
            var result = await _service
                .RegisterUserAsync(
                    request.Email, 
                    request.Password, 
                    request.FirstName, 
                    request.LastName,
                    request.ConfirmPassword);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("test")]
        public ActionResult Test()
        {
            var teste = User.Claims.FirstOrDefault(x => x.Type == "name")?.Value;
            return Ok("Teste");
        }
    }
}
