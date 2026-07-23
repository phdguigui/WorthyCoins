using WorthyCoins.Application.Commons.Results;
using WorthyCoins.Application.DTOs.Responses.GeneralInfo;

namespace WorthyCoins.Application.Interfaces
{
    public interface IGeneralInfoService
    {
        public Task<Result<SidebarInfoResponseDto>> GetSidebarInfoAsync(string userId);
    }
}
