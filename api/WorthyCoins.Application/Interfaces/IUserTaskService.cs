using WorthyCoins.Application.DTOs.Requests.UserTask;
using WorthyCoins.Application.DTOs.Responses.UserTask;

namespace WorthyCoins.Application.Interfaces
{
    public interface IUserTaskService
    {
        public Task<UserTaskResponseDto> CreateUserTaskAsync(CreateUserTaskRequestDto request);
        public Task<List<UserTaskResponseDto>> GetByChildId(GetUserTaskByChildIdRequestDto request);
        public Task<List<UserTaskResponseDto>> GetByParentId(GetUserTaskByParentIdRequestDto request);
        public Task<UserTaskResponseDto> Update(UpdateUserTaskRequestDto request);
        public Task Delete(int userTaskId);
    }
}
