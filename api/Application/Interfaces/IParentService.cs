using Application.DTOs.Requests.Parent;
using Application.DTOs.Requests.UserTask;
using Application.DTOs.Responses.Parent;

namespace Application.Interfaces
{
    public interface IParentService
    {
        public Task<ParentResponseDto> CreateParentAsync (CreateParentRequestDto request);
        public Task<ParentResponseDto> UpdateParentAsync (UpdateParentRequestDto request);
        public Task DeleteParentAsync (int parentId);
    }
}
