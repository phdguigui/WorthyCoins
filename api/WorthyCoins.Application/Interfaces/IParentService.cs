using WorthyCoins.Application.DTOs.Requests.Parent;
using WorthyCoins.Application.DTOs.Responses.Parent;

namespace WorthyCoins.Application.Interfaces
{
    public interface IParentService
    {
        public Task<ParentResponseDto> CreateParentAsync (CreateParentRequestDto request);
        public Task<ParentResponseDto> UpdateParentAsync (UpdateParentRequestDto request);
        public Task<ParentResponseDto> GetParentByUserIdAsync(string userId);
        public Task DeleteParentAsync (int parentId);
    }
}
