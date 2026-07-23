using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WorthyCoins.API.Resources.Errors;
using WorthyCoins.Application.Interfaces;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeneralInfoController(IGeneralInfoService generalInfoService, IStringLocalizer<Error> localizer) : ControllerBase
    {
        private readonly IGeneralInfoService _generalInfoService = generalInfoService;
        private readonly IStringLocalizer<Error> _localizer = localizer;

        [HttpGet]
        [Route("sidebar")]
        public async Task<ActionResult> SidebarInfo([FromQuery] string userId)
        {
            var result = await _generalInfoService.GetSidebarInfoAsync(userId);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return Unauthorized(result);
            }

            return Ok(result);
        }
    }
}
