using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
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
        public async Task<IActionResult> Create(CreateUserTaskRequestDto request)
        {
            await _service.CreateUserTaskAsync(request);

            return Ok();
        }
    }
}
