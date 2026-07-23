using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace WorthyCoins.Infrastructure;

public class WorthyCoinsDbContextFactory : IDesignTimeDbContextFactory<WorthyCoinsDbContext>
{
    public WorthyCoinsDbContext CreateDbContext(string[] args)
    {
        var basePath = Directory.GetCurrentDirectory();

        var apiProjectPath = Path.Combine(basePath, "../WorthyCoins.API");
        if (!Directory.Exists(apiProjectPath)) 
        {
            apiProjectPath = basePath;
        }

        var configuration = new ConfigurationBuilder()
            .SetBasePath(apiProjectPath)
            .AddJsonFile("appsettings.json", optional: true)
            .AddEnvironmentVariables()
            .AddUserSecrets("ff120a12-cad3-4c27-8ac0-050e14d57794") // ID from WorthyCoins.API.csproj
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<WorthyCoinsDbContext>();

        optionsBuilder.UseNpgsql(
            configuration.GetConnectionString("DefaultConnection")
        );

        return new WorthyCoinsDbContext(optionsBuilder.Options);
    }
}