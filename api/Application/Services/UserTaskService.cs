using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Services
{
    public class UserTaskService : IUserTaskService
    {
        private readonly WorthyCoinsDbContext _context;

        public UserTaskService(WorthyCoinsDbContext context)
        {
            _context = context;
        }

        public async Task CreateUserTaskAsync(CreateUserTaskRequestDto request)
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
                RewardAmout = request.RewardAmout
            };

            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
    }
}
