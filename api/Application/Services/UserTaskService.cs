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

        public void CreateTaskAsync()
        {
            var child = new Child
            {
                Name = "João Teste",
                DateOfBirth = new DateTime(2015, 5, 10, 0, 0, 0, DateTimeKind.Utc),
                TotalCoins = 0
            };

            _context.Children.Add(child);
            _context.SaveChanges();

            var task = new UserTask
            {
                Title = "Arrumar o quarto",
                Description = "Guardar brinquedos e organizar a cama",
                RewardAmout = 10.00m,
                DueDate = DateTime.UtcNow.AddDays(2),
                AssignedChildId = child.Id
                // CreationDate, IsCompleted e IsCanceled vêm do default
            };

            _context.UserTasks.Add(task);
            _context.SaveChanges();
        }
    }
}
