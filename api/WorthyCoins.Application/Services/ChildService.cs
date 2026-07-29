using WorthyCoins.Application.DTOs.Requests.Child;
using WorthyCoins.Application.DTOs.Responses.Child;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Domain.Entities;
using WorthyCoins.Application.Commons.Results;

namespace WorthyCoins.Application.Services
{
    public class ChildService : IChildService
    {
        private readonly IChildRepository _repository;

        public ChildService(IChildRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result<ChildResponseDto>> CreateChildAsync(CreateChildRequestDto request)
        {
            var entity = new Child
            {
                Name = request.Name,
                DateOfBirth = request.DateOfBirth,
                TotalCoins = 0,
                ParentId = request.ParentId
            };

            var child = await _repository.AddAsync(entity);

            return Result<ChildResponseDto>.Ok(new ChildResponseDto
            {
                Id = child.Id,
                Name = child.Name,
                DateOfBirth = child.DateOfBirth,
                TotalCoins = child.TotalCoins
            });
        }

        public async Task<Result<ChildResponseDto>> GetChildByIdAsync(int childId)
        {
            try
            {
                var child = await _repository.GetByIdAsync(childId);

                if (child == null)
                    return Result<ChildResponseDto>.Fail("CHILD_NOT_FOUND");

                return Result<ChildResponseDto>.Ok(new ChildResponseDto
                {
                    Id = child.Id,
                    Name = child.Name,
                    DateOfBirth = child.DateOfBirth,
                    TotalCoins = child.TotalCoins
                });
            }
            catch (Exception)
            {
                return Result<ChildResponseDto>.Fail("UNEXPECTED_ERROR");
            }
        }

        public async Task<Result<List<ChildResponseDto>>> GetChildrenByParentIdAsync(int parentId)
        {
            try
            {
                var children = await _repository.GetByParentIdAsync(parentId);

                if (children == null || !children.Any())
                    return Result<List<ChildResponseDto>>.Fail("CHILDREN_NOT_FOUND");

                var data = children.Select(c => new ChildResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    DateOfBirth = c.DateOfBirth,
                    TotalCoins = c.TotalCoins
                }).ToList();

                return Result<List<ChildResponseDto>>.Ok(data);
            }
            catch (Exception)
            {
                return Result<List<ChildResponseDto>>.Fail("UNEXPECTED_ERROR");
            }
        }

        public async Task<Result<ChildResponseDto>> UpdateChildAsync(UpdateChildRequestDto request)
        {
            try
            {
                var child = await _repository.GetByIdAsync(request.Id);

                if (child == null)
                    return Result<ChildResponseDto>.Fail("CHILD_NOT_FOUND");

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

                return Result<ChildResponseDto>.Ok(response);
            }
            catch (Exception)
            {
                return Result<ChildResponseDto>.Fail("UNEXPECTED_ERROR");
            }
        }

        public async Task<Result> DeleteChildAsync(int childId)
        {
            try
            {
                var rowsAffected = await _repository.DeleteAsync(childId);

                if (rowsAffected == 0)
                    return Result.Fail("CHILD_NOT_FOUND");

                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("UNEXPECTED_ERROR");
            }
        }
    }
}
