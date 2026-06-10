using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorthyCoins.Application.DTOs.Requests.Authentication;
using WorthyCoins.Application.Interfaces;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController(IAuthenticationService service) : ControllerBase
    {
        private readonly IAuthenticationService _service = service;

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDto request)
        {
            var token = await _service.LoginUserAsync(request.Email, request.Password);

            if (token == null) {
                return Unauthorized();
            }

            return Ok(new { token });
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] RegisterRequestDto request)
        {
            var token = await _service.RegisterUserAsync(request.Email, request.Password);

            if (token == null) {
                return BadRequest("User registration failed.");
            }

            return Ok(new { token });
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
