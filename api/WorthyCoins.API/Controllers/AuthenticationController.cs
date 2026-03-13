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
            var token = _service.LoginUserAsync(request.Email, request.Password);

            if (token == null) {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}
