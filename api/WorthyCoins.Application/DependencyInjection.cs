using WorthyCoins.Application.Interfaces;
using WorthyCoins.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace WorthyCoins.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IUserTaskService, UserTaskService>();
        services.AddScoped<IParentService, ParentService>();
        services.AddScoped<IChildService, ChildService>();
        services.AddScoped<ITransactionService, TransactionService>();

        return services;
    }
}