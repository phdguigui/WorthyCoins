using Application.DTOs;

namespace Application.Interfaces
{
    public interface IUserTaskService
    {
        public Task CreateUserTaskAsync(CreateUserTaskRequestDto request);
    }
}
