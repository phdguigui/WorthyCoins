using WorthyCoins.Application.DTOs.Requests.UserTask;
using WorthyCoins.Application.DTOs.Responses.Child;
using WorthyCoins.Application.DTOs.Responses.UserTask;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;
using WorthyCoins.Domain.Enumerators;
using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Application.Commons.Errors;

using Microsoft.Extensions.Localization;

namespace WorthyCoins.Application.Services
{
    public class UserTaskService : IUserTaskService
    {
        private readonly IUserTaskRepository _repository;
        private readonly IChildRepository _childRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IStringLocalizer _localizer;

        public UserTaskService(
            IUserTaskRepository repository,
            IChildRepository childRepository,
            ITransactionRepository transactionRepository,
            IStringLocalizerFactory localizerFactory)
        {
            _repository = repository;
            _childRepository = childRepository;
            _transactionRepository = transactionRepository;
            _localizer = localizerFactory.Create("WorthyCoins.API.Resources.Errors.Error", "WorthyCoins.API");
        }

        public async Task<Result<UserTaskResponseDto>> CreateUserTaskAsync(CreateUserTaskRequestDto request)
        {
            var entity = new UserTask
            {
                Title = request.Title,
                Description = request.Description,
                CreationDate = DateTime.UtcNow,
                DueDate = request.DueDate,
                AssignedChildId = request.AssignedChildId,
                RewardAmount = request.RewardAmount,
                Icon = request.Icon,
                Color = request.Color
            };

            entity = await _repository.AddAsync(entity);

            return Result<UserTaskResponseDto>.Ok(MapToDto(entity));
        }

        public async Task<Result<List<UserTaskResponseDto>>> GetByChildId(GetUserTaskByChildIdRequestDto request)
        {
            try
            {
                var entities = await _repository.GetByChildIdAsync(request.ChildId);
                var data = entities.Select(MapToDto).ToList();
                return Result<List<UserTaskResponseDto>>.Ok(data);
            }
            catch (Exception)
            {
                return Result<List<UserTaskResponseDto>>.Fail("UNEXPECTED_ERROR");
            }
        }

        public async Task<Result<PagedResult<UserTaskResponseDto>>> GetByParentId(
            int parentId,
            UserTaskStatusEnum? status,
            int? childId,
            DateTime? dueDate,
            string? search = null,
            string? dueDateSort = null,
            string? filterType = null,
            int pageNumber = 1,
            int pageSize = 10)
        {
            try
            {
                var paged = await _repository.GetByParentIdAsync(parentId, status, childId, dueDate, search, dueDateSort, filterType, pageNumber, pageSize);

                var dtoItems = paged.Items.Select(MapToDto).ToList();

                var resultPaged = new PagedResult<UserTaskResponseDto>
                {
                    Items = dtoItems,
                    PageNumber = paged.PageNumber,
                    PageSize = paged.PageSize,
                    TotalItems = paged.TotalItems
                };

                return Result<PagedResult<UserTaskResponseDto>>.Ok(resultPaged);
            }
            catch (Exception)
            {
                return Result<PagedResult<UserTaskResponseDto>>.Fail("UNEXPECTED_ERROR");
            }
        }

        public async Task<Result<UserTaskResponseDto>> Update(UpdateUserTaskRequestDto request)
        {
            try
            {
                var userTask = await _repository.GetByIdAsync(request.UserTaskId);

                if (userTask == null)
                    return Result<UserTaskResponseDto>.Fail("USER_TASK_NOT_FOUND");

                if (userTask.Status == UserTaskStatusEnum.Completed && request.RewardAmount.HasValue && request.RewardAmount.Value != userTask.RewardAmount)
                    return Result<UserTaskResponseDto>.Fail(ErrorCodes.CompletedTaskRewardCannotBeModified);

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

                if (!string.IsNullOrWhiteSpace(request.Icon))
                    userTask.Icon = request.Icon;

                if (!string.IsNullOrWhiteSpace(request.Color))
                    userTask.Color = request.Color;

                if (request.Status.HasValue && request.Status.Value != userTask.Status)
                {
                    var child = await _childRepository.GetByIdAsync(userTask.AssignedChildId);
                    if (child != null)
                    {
                        var newStatus = request.Status.Value;
                        var reward = userTask.RewardAmount;

                        if (newStatus == UserTaskStatusEnum.Completed)
                        {
                            child.TotalCoins += reward;
                            await _childRepository.UpdateAsync(child);

                            var description = _localizer["TASK_COMPLETED_DESC", userTask.Title].Value;

                            var transaction = new Transaction
                            {
                                TransactionType = TransactionTypeEnum.TaskCompleted,
                                ChildId = child.Id,
                                Amount = reward,
                                TransactionDate = DateTime.UtcNow,
                                Description = description,
                                Child = child
                            };
                            await _transactionRepository.AddAsync(transaction);
                        }
                        else if (newStatus == UserTaskStatusEnum.Pending)
                        {
                            child.TotalCoins -= reward;
                            await _childRepository.UpdateAsync(child);

                            var description = _localizer["TASK_REOPENED_DESC", userTask.Title].Value;

                            var transaction = new Transaction
                            {
                                TransactionType = TransactionTypeEnum.TaskCompleted,
                                ChildId = child.Id,
                                Amount = -reward,
                                TransactionDate = DateTime.UtcNow,
                                Description = description,
                                Child = child
                            };
                            await _transactionRepository.AddAsync(transaction);
                        }
                    }
                }

                if (request.Status.HasValue)
                    userTask.Status = request.Status.Value;

                userTask = await _repository.UpdateAsync(userTask);

                return Result<UserTaskResponseDto>.Ok(MapToDto(userTask));
            }
            catch (Exception)
            {
                return Result<UserTaskResponseDto>.Fail("UNEXPECTED_ERROR");
            }
        }

        public async Task<Result> Delete(int userTaskId)
        {
            try
            {
                var rowsAffected = await _repository.DeleteAsync(userTaskId);

                if (rowsAffected == 0)
                    return Result.Fail("USER_TASK_NOT_FOUND");

                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("UNEXPECTED_ERROR");
            }
        }

        private static UserTaskResponseDto MapToDto(UserTask entity)
        {
            var assignedChild = new ChildResponseDto { 
                Id = entity.AssignedChildId,
                Name = entity.AssignedChild?.Name!,
                DateOfBirth = entity.AssignedChild?.DateOfBirth,
                TotalCoins = entity.AssignedChild?.TotalCoins ?? 0,
                Icon = entity.AssignedChild?.Icon!,
                Color = entity.AssignedChild?.Color!
            };

            return new UserTaskResponseDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description,
                CreationDate = entity.CreationDate,
                DueDate = entity.DueDate,
                AssignedChildId = entity.AssignedChildId,
                AssignedChild = assignedChild,
                RewardAmount = entity.RewardAmount,
                Status = entity.Status,
                Icon = entity.Icon,
                Color = entity.Color
            };
        }
    }
}