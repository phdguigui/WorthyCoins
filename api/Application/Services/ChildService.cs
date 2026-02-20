using Application.DTOs.Requests.Child;
using Application.DTOs.Responses.Child;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class ChildService : IChildService
    {
        private readonly WorthyCoinsDbContext _context;

        public ChildService(WorthyCoinsDbContext context)
        {
            _context = context;
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

            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();

            var response = new ChildResponseDto
            {
                Id = entity.Id,
                Name = entity.Name,
                DateOfBirth = entity.DateOfBirth,
                TotalCoins = 0,
            };

            return response;
        }

        public async Task<ChildResponseDto> GetChildByIdAsync(int childId)
        {
            var response = await _context.Children
                .Where(c => c.Id == childId)
                .Select(c => new ChildResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    DateOfBirth = c.DateOfBirth,
                    TotalCoins = c.TotalCoins
                })
                .FirstOrDefaultAsync();

            return response ?? throw new KeyNotFoundException($"Child with ID {childId} not found.");
        }

        public async Task<List<ChildResponseDto>> GetChildrenByParentIdAsync(int parentId)
        {
            var response = await _context.Children
                .Where(c => c.ParentId == parentId)
                .Select(c => new ChildResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    DateOfBirth = c.DateOfBirth,
                    TotalCoins = c.TotalCoins
                })
                .ToListAsync();

            return response ?? throw new KeyNotFoundException($"No children found for Parent with ID {parentId}.");
        }

        public async Task<ChildResponseDto> UpdateChildAsync(UpdateChildRequestDto request)
        {
            var child = await _context.Children
                .FirstOrDefaultAsync(x => x.Id == request.Id)
                ??
                throw new Exception($"Child com ID {request.Id} não encontrado.");

            if (request.Name != child.Name)
                child.Name = request.Name;

            if (request.DateOfBirth != child.DateOfBirth)
                child.DateOfBirth = request.DateOfBirth;

            _context.Children.Update(child);
            await _context.SaveChangesAsync();

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
            var rowsAffected = await _context.Children
                .Where(x => x.Id == childId)
                .ExecuteDeleteAsync();

            if (rowsAffected == 0)
            {
                throw new Exception($"Child com ID {childId} não encontrada.");
            }
        }
    }
}
