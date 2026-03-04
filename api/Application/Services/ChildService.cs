using Application.DTOs.Requests.Child;
using Application.DTOs.Responses.Child;
using Application.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Entities;

namespace Application.Services
{
    public class ChildService : IChildService
    {
        private readonly IChildRepository _repository;

        public ChildService(IChildRepository repository)
        {
            _repository = repository;
        }

        public async Task<ChildResponseDto> CreateChildAsync(CreateChildRequestDto request)
        {
            var entity = new Child
            {
                Name = request.Name,
                DateOfBirth = request.DateOfBirth,
                TotalCoins = 0,
                ParentId = request.ParentId
            };

            var child = await _repository.AddAsync(entity);

            return new ChildResponseDto
            {
                Id = child.Id,
                Name = child.Name,
                DateOfBirth = child.DateOfBirth,
                TotalCoins = child.TotalCoins
            };
        }

        public async Task<ChildResponseDto> GetChildByIdAsync(int childId)
        {
            var child = await _repository.GetByIdAsync(childId)
                ?? throw new KeyNotFoundException($"Child with ID {childId} not found.");

            return new ChildResponseDto
            {
                Id = child.Id,
                Name = child.Name,
                DateOfBirth = child.DateOfBirth,
                TotalCoins = child.TotalCoins
            };
        }

        public async Task<List<ChildResponseDto>> GetChildrenByParentIdAsync(int parentId)
        {
            var children = await _repository.GetByParentIdAsync(parentId);

            if (children == null || !children.Any())
                throw new KeyNotFoundException($"No children found for Parent with ID {parentId}.");

            return children.Select(c => new ChildResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                DateOfBirth = c.DateOfBirth,
                TotalCoins = c.TotalCoins
            }).ToList();
        }

        public async Task<ChildResponseDto> UpdateChildAsync(UpdateChildRequestDto request)
        {
            var child = await _repository.GetByIdAsync(request.Id)
                ??
                throw new Exception($"Child com ID {request.Id} não encontrado.");

            // Fix these comparisons
            if (request.Name != child.Name)
                child.Name = request.Name;

            if (request.DateOfBirth != child.DateOfBirth)
                child.DateOfBirth = request.DateOfBirth;

            child = await _repository.UpdateAsync(child);

            var response = new ChildResponseDto
            {
                Id = child.Id,
                Name = child.Name,
                DateOfBirth = child.DateOfBirth,
            };

            return response;
        }

        public async Task DeleteChildAsync(int childId)
        {
            var rowsAffected = await _repository.DeleteAsync(childId);

            if (rowsAffected == 0)
            {
                throw new Exception($"Child com ID {childId} não encontrada.");
            }
        }
    }
}
