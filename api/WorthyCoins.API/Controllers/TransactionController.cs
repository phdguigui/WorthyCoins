using WorthyCoins.Application.DTOs.Requests.Child;
using WorthyCoins.Application.DTOs.Responses.Child;
using WorthyCoins.Application.DTOs.Responses.Transaction;
using WorthyCoins.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WorthyCoins.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _service;
        public TransactionController(ITransactionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<TransactionResponseDto>>> Get([FromQuery] int parentId)
        {
            var response = await _service.GetTransactionsAsync(parentId);
            return Ok(response);
        }
    }
}
