using Application.DTOs.Requests.Child;
using Application.DTOs.Responses.Child;

namespace Application.Interfaces
{
    public interface IChildService
    {
        public Task<ChildResponseDto> CreateChildAsync (CreateChildRequestDto request);
        public Task<ChildResponseDto> GetChildByIdAsync (int childId);
        public Task<List<ChildResponseDto>> GetChildrenByParentIdAsync (int parentId);
        public Task<ChildResponseDto> UpdateChildAsync (UpdateChildRequestDto request);
        public Task DeleteChildAsync (int childId);
    }
}
