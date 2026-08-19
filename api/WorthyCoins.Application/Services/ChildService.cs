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
                ParentId = request.ParentId,
                Icon = request.Icon,
                Color = request.Color
            };

            var child = await _repository.AddAsync(entity);

            return Result<ChildResponseDto>.Ok(new ChildResponseDto
            {
                Id = child.Id,
                Name = child.Name,
                DateOfBirth = child.DateOfBirth,
                TotalCoins = child.TotalCoins,
                Icon = child.Icon,
                Color = child.Color
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
                    TotalCoins = child.TotalCoins,
                    Icon = child.Icon,
                    Color = child.Color
                });
            }
            catch (Exception)
            {
                return Result<ChildResponseDto>.Fail("UNEXPECTED_ERROR");
            }
        }

        public async Task<Result<PagedResult<ChildResponseDto>>> GetChildrenByParentIdAsync(int parentId, int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var paged = await _repository.GetByParentIdAsync(parentId, pageNumber, pageSize);

                if (paged.Items == null || !paged.Items.Any())
                    return Result<PagedResult<ChildResponseDto>>.Fail("CHILDREN_NOT_FOUND");

                var dtoItems = paged.Items.Select(c => new ChildResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    DateOfBirth = c.DateOfBirth,
                    TotalCoins = c.TotalCoins,
                    Icon = c.Icon,
                    Color = c.Color
                }).ToList();

                var resultPaged = new PagedResult<ChildResponseDto>
                {
                    Items = dtoItems,
                    PageNumber = paged.PageNumber,
                    PageSize = paged.PageSize,
                    TotalItems = paged.TotalItems
                };

                return Result<PagedResult<ChildResponseDto>>.Ok(resultPaged);
            }
            catch (Exception)
            {
                return Result<PagedResult<ChildResponseDto>>.Fail("UNEXPECTED_ERROR");
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

                if (!string.IsNullOrWhiteSpace(request.Icon))
                    child.Icon = request.Icon;

                if (!string.IsNullOrWhiteSpace(request.Color))
                    child.Color = request.Color;

                child = await _repository.UpdateAsync(child);

                var response = new ChildResponseDto
                {
                    Id = child.Id,
                    Name = child.Name,
                    DateOfBirth = child.DateOfBirth,
                    TotalCoins = child.TotalCoins,
                    Icon = child.Icon,
                    Color = child.Color
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
