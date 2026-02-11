using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class UserTaskService : IUserTaskService
    {
        private readonly WorthyCoinsDbContext _context;

        public UserTaskService(WorthyCoinsDbContext context)
        {
            _context = context;
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

            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();

            var response = new UserTaskResponseDto
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

            return response;
        }

        public async Task<List<UserTaskResponseDto>> GetByChildId(GetUserTaskByChildIdRequestDto request)
        {
            return await _context.UserTasks
                .AsNoTracking()
                .Where(x => x.AssignedChildId == request.ChildId)
                .Select(task => new UserTaskResponseDto
                {
                    Id = task.Id,
                    Title = task.Title,
                    Description = task.Description,
                    CreationDate = task.CreationDate,
                    DueDate = task.DueDate,
                    AssignedChildId = task.AssignedChildId,
                    IsCompleted = task.IsCompleted,
                    IsCanceled = task.IsCanceled,
                    RewardAmount = task.RewardAmount
                })
                .ToListAsync();
        }

        public async Task<List<UserTaskResponseDto>> GetByParentId(GetUserTaskByParentIdRequestDto request)
        {
            return await _context.UserTasks
                .AsNoTracking()
                .Include(x => x.AssignedChild)
                .ThenInclude(x => x!.Parent)
                .Where(x => x.AssignedChild!.ParentId == request.ParentId)
                .Select(task => new UserTaskResponseDto
                {
                    Id = task.Id,
                    Title = task.Title,
                    Description = task.Description,
                    CreationDate = task.CreationDate,
                    DueDate = task.DueDate,
                    AssignedChildId = task.AssignedChildId,
                    IsCompleted = task.IsCompleted,
                    IsCanceled = task.IsCanceled,
                    RewardAmount = task.RewardAmount
                })
                .ToListAsync();
        }

        public async Task<UserTaskResponseDto> Update(UpdateUserTaskRequestDto request)
        {
            var userTask = await _context.UserTasks
                .FirstOrDefaultAsync(x => x.Id == request.UserTaskId) 
                ?? 
                throw new Exception($"UserTask com ID {request.UserTaskId} não encontrada.");

            if (request.Title != null)
                userTask.Title = request.Title;

            if (request.Description != null)
                userTask.Description = request.Description;

            if (request.DueDate.HasValue)
                userTask.DueDate = request.DueDate.Value;

            if (request.AssignedChildId.HasValue)
                userTask.AssignedChildId = request.AssignedChildId.Value;

            if (request.RewardAmount.HasValue)
                userTask.RewardAmount = request.RewardAmount.Value;

            _context.UserTasks.Update(userTask);
            await _context.SaveChangesAsync();

            var response = new UserTaskResponseDto
            {
                Id = userTask.Id,
                Title = userTask.Title,
                Description = userTask.Description,
                CreationDate = userTask.CreationDate,
                DueDate = userTask.DueDate,
                AssignedChildId = userTask.AssignedChildId,
                IsCompleted = userTask.IsCompleted,
                IsCanceled = userTask.IsCanceled,
                RewardAmount = userTask.RewardAmount
            };

            return response;
        }

        public async Task Delete(int userTaskId)
        {
            var rowsAffected = await _context.UserTasks
                .Where(x => x.Id == userTaskId)
                .ExecuteDeleteAsync();

            if (rowsAffected == 0)
            {
                throw new Exception($"UserTask com ID {userTaskId} não encontrada.");
            }
        }
    }
}
