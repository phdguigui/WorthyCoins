using Application.DTOs.Requests.Child;
using Application.DTOs.Responses.Child;
using Application.DTOs.Responses.Transaction;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
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
