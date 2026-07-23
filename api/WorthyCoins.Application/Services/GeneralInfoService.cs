using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Application.Commons.Errors;
using WorthyCoins.Application.DTOs.Responses.GeneralInfo;
using WorthyCoins.Application.Interfaces;
using WorthyCoins.Application.Interfaces.Repositories;

namespace WorthyCoins.Application.Services
{
    public class GeneralInfoService(IUserRepository userRepository, IChildRepository childRepository, IParentRepository parentRepository) : IGeneralInfoService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IChildRepository _childRepository = childRepository;
        private readonly IParentRepository _parentRepository = parentRepository;

        public async Task<Result<SidebarInfoResponseDto>> GetSidebarInfoAsync(string userId)
        {
            var (firstName, lastName) = await _userRepository.GetUserNamesAsync(userId);

            if (firstName == null || lastName == null)
                return Result<SidebarInfoResponseDto>.Fail(ErrorCodes.UserNotFound);

            var parent = await _parentRepository.GetByUserIdAsync(userId);

            if (parent == null)
                return Result<SidebarInfoResponseDto>.Fail(ErrorCodes.ParentNotFound);

            var totalBalance = await _childRepository.GetChildrenTotalBalanceAsync(parent.Id);

            return Result<SidebarInfoResponseDto>.Ok(new SidebarInfoResponseDto
            {
                FirstName = firstName!,
                LastName = lastName!,
                TotalBalance = totalBalance
            });
        }
    }
}
