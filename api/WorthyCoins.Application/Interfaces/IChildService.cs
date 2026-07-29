using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Application.DTOs.Requests.Child;
using WorthyCoins.Application.DTOs.Responses.Child;

namespace WorthyCoins.Application.Interfaces
{
    public interface IChildService
    {
        public Task<Result<ChildResponseDto>> CreateChildAsync(CreateChildRequestDto request);
        public Task<Result<ChildResponseDto>> GetChildByIdAsync(int childId);
        public Task<Result<PagedResult<ChildResponseDto>>> GetChildrenByParentIdAsync(int parentId, int pageNumber = 1, int pageSize = 10);
        public Task<Result<ChildResponseDto>> UpdateChildAsync(UpdateChildRequestDto request);
        public Task<Result> DeleteChildAsync(int childId);
    }
}
