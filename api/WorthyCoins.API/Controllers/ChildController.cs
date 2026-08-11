using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WorthyCoins.API.Resources.Errors;
using WorthyCoins.Application.DTOs.Requests.Child;
using WorthyCoins.Application.Interfaces;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ChildController : ControllerBase
    {
        private readonly IChildService _service;
        private readonly IStringLocalizer<Error> _localizer;

        public ChildController(IChildService childService, IStringLocalizer<Error> localizer)
        {
            _service = childService;
            _localizer = localizer;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateChildRequestDto request)
        {
            var result = await _service.CreateChildAsync(request);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] int childId)
        {
            var result = await _service.GetChildByIdAsync(childId);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("get-by-parent-id")]
        public async Task<ActionResult> GetByParentId(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var parentIdClaim = User.FindFirst("parentId")?.Value;
            if (string.IsNullOrEmpty(parentIdClaim) || !int.TryParse(parentIdClaim, out var parentId))
            {
                return Unauthorized();
            }

            var result = await _service.GetChildrenByParentIdAsync(parentId, pageNumber, pageSize);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateChildRequestDto request)
        {
            var result = await _service.UpdateChildAsync(request);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete([FromQuery] int childId)
        {
            var result = await _service.DeleteChildAsync(childId);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
