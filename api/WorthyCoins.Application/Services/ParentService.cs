using WorthyCoins.Application.DTOs.Requests.Parent;
using WorthyCoins.Application.DTOs.Responses.Parent;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;

namespace WorthyCoins.Application.Services
{
    public class ParentService : IParentService
    {
        private readonly IParentRepository _repository;

        public ParentService(IParentRepository repository)
        {
            _repository = repository;
        }

        public async Task<ParentResponseDto> CreateParentAsync(CreateParentRequestDto request)
        {
            var entity = new Parent
            {
                Email = request.Email,
                Name = request.Name
            };

            entity = await _repository.AddAsync(entity);

            var response = new ParentResponseDto
            {
                Id = entity.Id,
                Email = entity.Email,
                Name = entity.Name
            };

            return response;
        }

        public async Task<ParentResponseDto> UpdateParentAsync(UpdateParentRequestDto request)
        {
            var parent = await _repository.GetByIdAsync(request.Id)
                ?? throw new Exception($"Parent com ID {request.Id} não encontrado.");

            if (!string.IsNullOrWhiteSpace(request.Email))
                parent.Email = request.Email;

            if (!string.IsNullOrWhiteSpace(request.Name))
                parent.Name = request.Name;

            parent = await _repository.UpdateAsync(parent);

            var response = new ParentResponseDto
            {
                Id = parent.Id,
                Email = parent.Email,
                Name = parent.Name
            };

            return response;
        }

        public async Task DeleteParentAsync(int parentId)
        {
            var rowsAffected = await _repository.DeleteAsync(parentId);

            if (rowsAffected == 0)
            {
                throw new Exception($"Parent com ID {parentId} não encontrado.");
            }
        }
    }
}