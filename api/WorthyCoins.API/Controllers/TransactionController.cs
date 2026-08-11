using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorthyCoins.Application.DTOs.Responses.Transaction;
using WorthyCoins.Application.Interfaces;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _service;
        public TransactionController(ITransactionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<TransactionResponseDto>>> Get()
        {
            var parentIdClaim = User.FindFirst("parentId")?.Value;
            if (string.IsNullOrEmpty(parentIdClaim) || !int.TryParse(parentIdClaim, out var parentId))
            {
                return Unauthorized();
            }

            var response = await _service.GetTransactionsAsync(parentId);
            return Ok(response);
        }
    }
}
