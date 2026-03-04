using WorthyCoins.Application.DTOs.Requests.Parent;
using WorthyCoins.Application.DTOs.Responses.Parent;
using WorthyCoins.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParentController : ControllerBase
    {
        private readonly IParentService _service;
        public ParentController(IParentService parentService)
        {
            _service = parentService;
        }

        [HttpPost]
        public async Task<ActionResult<ParentResponseDto>> Create(CreateParentRequestDto request)
        {
            var response = await _service.CreateParentAsync(request);

            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult<ParentResponseDto>> Update(UpdateParentRequestDto request)
        {
            var response = await _service.UpdateParentAsync(request);
            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int parentId)
        {
            await _service.DeleteParentAsync(parentId);
            return Ok();
        }
    }
}
