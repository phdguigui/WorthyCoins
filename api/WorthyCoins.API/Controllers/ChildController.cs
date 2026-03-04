using WorthyCoins.Application.DTOs.Requests.Child;
using WorthyCoins.Application.DTOs.Responses.Child;
using WorthyCoins.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChildController : ControllerBase
    {
        private readonly IChildService _service;
        public ChildController(IChildService childService)
        {
            _service = childService;
        }

        [HttpPost]
        public async Task<ActionResult<ChildResponseDto>> Create(CreateChildRequestDto request)
        {
            var response = await _service.CreateChildAsync(request);

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<ChildResponseDto>> Get([FromQuery] int childId)
        {
            var response = await _service.GetChildByIdAsync(childId);
            return Ok(response);
        }

        [HttpGet]
        [Route("get-by-parent-id")]
        public async Task<ActionResult<List<ChildResponseDto>>> GetByParentId([FromQuery] int parentId)
        {
            var response = await _service.GetChildrenByParentIdAsync(parentId);
            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult<ChildResponseDto>> Update(UpdateChildRequestDto request)
        {
            var response = await _service.UpdateChildAsync(request);
            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int childId)
        {
            await _service.DeleteChildAsync(childId);
            return Ok();
        }
    }
}
