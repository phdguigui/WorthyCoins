using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        [HttpGet()]
        public IActionResult ReturnTask([FromQuery] string? name)
        {
            var teste = name;
            return Ok(teste);
        }
    }
}
