using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly IUserTaskService _service;
        public TaskController(IUserTaskService taskService)
        {
            _service = taskService;
        }

        [HttpGet()]
        public IActionResult ReturnTask([FromQuery] string? name = "Gui")
        {
            var teste = name;

            _service.CreateTaskAsync();

            return Ok(teste);
        }
    }
}
