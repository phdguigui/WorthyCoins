using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Application.DTOs.Requests.UserTask;
using WorthyCoins.Application.DTOs.Responses.UserTask;
using WorthyCoins.Domain.Enumerators;

namespace WorthyCoins.Application.Interfaces
{
    public interface IUserTaskService
    {
        public Task<Result<UserTaskResponseDto>> CreateUserTaskAsync(CreateUserTaskRequestDto request);
        public Task<Result<List<UserTaskResponseDto>>> GetByChildId(GetUserTaskByChildIdRequestDto request);
        public Task<Result<PagedResult<UserTaskResponseDto>>> GetByParentId(int parentId, UserTaskStatusEnum? status = null, int? childId = null, DateTime? dueDate = null, int pageNumber = 1, int pageSize = 10);
        public Task<Result<UserTaskResponseDto>> Update(UpdateUserTaskRequestDto request);
        public Task<Result> Delete(int userTaskId);
    }
}
