using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WorthyCoins.Application.Interfaces.Repositories;
using WorthyCoins.Infrastructure.Repositories;

namespace WorthyCoins.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<WorthyCoinsDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")
            )
        );

        services.AddScoped<IUserTaskRepository, UserTaskRepository>();
        services.AddScoped<IParentRepository, ParentRepository>();
        services.AddScoped<IChildRepository, ChildRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();

        return services;
    }
}