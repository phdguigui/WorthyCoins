using Application.DTOs.Requests.Parent;
using Application.DTOs.Responses.Parent;
using Application.DTOs.Responses.UserTask;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ParentService : IParentService
    {
        private readonly WorthyCoinsDbContext _context;

        public ParentService(WorthyCoinsDbContext context)
        {
            _context = context;
        }

        public async Task<ParentResponseDto> CreateParentAsync(CreateParentRequestDto request)
        {
            var entity = new Parent
            {
                Email = request.Email,
                Name = request.Name
            };

            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();

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
            var parent = await _context.Parents
                .FirstOrDefaultAsync(x => x.Id == request.Id)
                ??
                throw new Exception($"Parent com ID {request.Id} não encontrado.");

            if (request.Email != null)
                parent.Email = request.Email;

            if (request.Name != null)
                parent.Name = request.Name;

            _context.Parents.Update(parent);
            await _context.SaveChangesAsync();

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
            var rowsAffected = await _context.Parents
                .Where(x => x.Id == parentId)
                .ExecuteDeleteAsync();

            if (rowsAffected == 0)
            {
                throw new Exception($"Parent com ID {parentId} não encontrada.");
            }
        }
    }
}
