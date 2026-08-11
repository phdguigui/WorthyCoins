using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WorthyCoins.API.Resources.Errors;
using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Application.DTOs.Requests.UserTask;
using WorthyCoins.Application.DTOs.Responses.UserTask;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserTaskController : ControllerBase
    {
        private readonly IUserTaskService _service;
        private readonly IStringLocalizer<Error> _localizer;

        public UserTaskController(IUserTaskService taskService, IStringLocalizer<Error> localizer)
        {
            _service = taskService;
            _localizer = localizer;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateUserTaskRequestDto request)
        {
            var result = await _service.CreateUserTaskAsync(request);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("get-by-child")]
        public async Task<ActionResult> GetByChild(GetUserTaskByChildIdRequestDto request)
        {
            var result = await _service.GetByChildId(request);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetByParent(
            [FromQuery] UserTaskStatusEnum? status,
            [FromQuery] int? childId,
            [FromQuery] DateTime? dueDate,
            [FromQuery] string? search,
            [FromQuery] string? dueDateSort,
            [FromQuery] string? filterType,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var parentIdClaim = User.FindFirst("parentId")?.Value;
            if (string.IsNullOrEmpty(parentIdClaim) || !int.TryParse(parentIdClaim, out var parentId))
            {
                return Unauthorized();
            }

            var svcResult = await _service.GetByParentId(parentId, status, childId, dueDate, search, dueDateSort, filterType, pageNumber, pageSize);

            if (!svcResult.Success)
            {
                svcResult.Message = _localizer[svcResult.ErrorCode ?? string.Empty].Value;
                return BadRequest(svcResult);
            }

            return Ok(svcResult);
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateUserTaskRequestDto request)
        {
            var result = await _service.Update(request);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete([FromQuery]int userTaskId)
        {
            var result = await _service.Delete(userTaskId);

            if (!result.Success)
            {
                result.Message = _localizer[result.ErrorCode ?? string.Empty].Value;
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
