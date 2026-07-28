using Microsoft.AspNetCore.Mvc;
using WorthyCoins.Application.DTOs.Requests.UserTask;
using WorthyCoins.Application.DTOs.Responses.UserTask;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserTaskController : ControllerBase
    {
        private readonly IUserTaskService _service;
        public UserTaskController(IUserTaskService taskService)
        {
            _service = taskService;
        }

        [HttpPost]
        public async Task<ActionResult<UserTaskResponseDto>> Create(CreateUserTaskRequestDto request)
        {
            var response = await _service.CreateUserTaskAsync(request);

            return Ok(response);
        }

        [HttpGet]
        [Route("get-by-child")]
        public async Task<ActionResult<List<UserTaskResponseDto>>> GetByChild(GetUserTaskByChildIdRequestDto request)
        {
            var response = await _service.GetByChildId(request);

            return Ok(response);
        }

        [HttpGet]
        [Route("{parentId}")]
        public async Task<ActionResult<List<UserTaskResponseDto>>> GetByParent(
            [FromRoute] int parentId,
            [FromQuery] UserTaskStatusEnum? status,
            [FromQuery] int? childId,
            [FromQuery] DateTime? dueDate)
        {
            var response = await _service.GetByParentId(parentId, status, childId, dueDate);

            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult<UserTaskResponseDto>> Update(UpdateUserTaskRequestDto request)
        {
            var response = await _service.Update(request);
            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery]int userTaskId)
        {
            await _service.Delete(userTaskId);
            return Ok();
        }
    }
}
