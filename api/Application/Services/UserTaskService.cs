using Application.DTOs.Requests.UserTask;
using Application.DTOs.Responses.UserTask;
using Application.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Entities;

namespace Application.Services
{
    public class UserTaskService : IUserTaskService
    {
        private readonly IUserTaskRepository _repository;

        public UserTaskService(IUserTaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<UserTaskResponseDto> CreateUserTaskAsync(CreateUserTaskRequestDto request)
        {
            var entity = new UserTask
            {
                Title = request.Title,
                Description = request.Description,
                CreationDate = DateTime.UtcNow,
                DueDate = request.DueDate,
                AssignedChildId = request.AssignedChildId,
                IsCompleted = false,
                IsCanceled = false,
                RewardAmount = request.RewardAmount
            };

            entity = await _repository.AddAsync(entity);

            return MapToDto(entity);
        }

        public async Task<List<UserTaskResponseDto>> GetByChildId(GetUserTaskByChildIdRequestDto request)
        {
            var entities = await _repository.GetByChildIdAsync(request.ChildId);

            return entities.Select(MapToDto).ToList();
        }

        public async Task<List<UserTaskResponseDto>> GetByParentId(GetUserTaskByParentIdRequestDto request)
        {
            var entities = await _repository.GetByParentIdAsync(request.ParentId);

            return entities.Select(MapToDto).ToList();
        }

        public async Task<UserTaskResponseDto> Update(UpdateUserTaskRequestDto request)
        {
            var userTask = await _repository.GetByIdAsync(request.UserTaskId)
                ?? throw new Exception($"UserTask com ID {request.UserTaskId} não encontrada.");

            if (!string.IsNullOrWhiteSpace(request.Title))
                userTask.Title = request.Title;

            if (!string.IsNullOrWhiteSpace(request.Description))
                userTask.Description = request.Description;

            if (request.DueDate.HasValue)
                userTask.DueDate = request.DueDate.Value;

            if (request.AssignedChildId.HasValue)
                userTask.AssignedChildId = request.AssignedChildId.Value;

            if (request.RewardAmount.HasValue)
                userTask.RewardAmount = request.RewardAmount.Value;

            userTask = await _repository.UpdateAsync(userTask);

            return MapToDto(userTask);
        }

        public async Task Delete(int userTaskId)
        {
            var rowsAffected = await _repository.DeleteAsync(userTaskId);

            if (rowsAffected == 0)
                throw new Exception($"UserTask com ID {userTaskId} não encontrada.");
        }

        private static UserTaskResponseDto MapToDto(UserTask entity)
        {
            return new UserTaskResponseDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description,
                CreationDate = entity.CreationDate,
                DueDate = entity.DueDate,
                AssignedChildId = entity.AssignedChildId,
                IsCompleted = entity.IsCompleted,
                IsCanceled = entity.IsCanceled,
                RewardAmount = entity.RewardAmount
            };
        }
    }
}