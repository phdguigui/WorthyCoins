using WorthyCoins.Application.DTOs.Requests.UserTask;
using WorthyCoins.Application.DTOs.Responses.UserTask;
using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.Application.Interfaces
{
    public interface IUserTaskService
    {
        public Task<UserTaskResponseDto> CreateUserTaskAsync(CreateUserTaskRequestDto request);
        public Task<List<UserTaskResponseDto>> GetByChildId(GetUserTaskByChildIdRequestDto request);
        public Task<List<UserTaskResponseDto>> GetByParentId(int parentId, UserTaskStatusEnum? status = null, int? childId = null, DateTime? dueDate = null);
        public Task<UserTaskResponseDto> Update(UpdateUserTaskRequestDto request);
        public Task Delete(int userTaskId);
    }
}
