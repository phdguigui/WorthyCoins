using WorthyCoins.Application.DTOs.Requests.Parent;
using WorthyCoins.Application.DTOs.Responses.Parent;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;

namespace WorthyCoins.Application.Services
{
    public class ParentService(IParentRepository repository, IUserRepository userRepository) : IParentService
    {
        private readonly IParentRepository _repository = repository;
        private readonly IUserRepository _userRepository = userRepository;

        public async Task<ParentResponseDto> CreateParentAsync(CreateParentRequestDto request)
        {
            var entity = new Parent
            {
                Name = request.Name,
                UserId = request.UserId,
            };

            entity = await _repository.AddAsync(entity);

            var response = new ParentResponseDto
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId
            };

            return response;
        }

        public async Task<ParentResponseDto> UpdateParentAsync(UpdateParentRequestDto request)
        {
            var entity = await _repository.GetByIdAsync(request.Id) ?? throw new Exception("Parent not found");
            entity.Name = request.Name;

            entity = await _repository.UpdateAsync(entity);

            var response = new ParentResponseDto
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId
            };

            return response;
        }

        public async Task DeleteParentAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id) ?? throw new Exception("Parent not found");
            await _repository.DeleteAsync(id);
            await _userRepository.DeleteUserAsync(entity.UserId);
        }

        public async Task<ParentResponseDto> GetParentByUserIdAsync(string userId)
        {
            var entity = await _repository.GetByUserIdAsync(userId) ?? throw new Exception("Parent not found");

            var response = new ParentResponseDto
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId
            };

            return response;
        }
    }
}