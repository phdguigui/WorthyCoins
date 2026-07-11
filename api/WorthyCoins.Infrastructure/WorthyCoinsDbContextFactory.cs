using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace WorthyCoins.Infrastructure;

public class WorthyCoinsDbContextFactory(IConfiguration configuration)
        : IDesignTimeDbContextFactory<WorthyCoinsDbContext>
{
    private readonly IConfiguration _configuration = configuration;

    public WorthyCoinsDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<WorthyCoinsDbContext>();

        optionsBuilder.UseNpgsql(
            _configuration.GetConnectionString("DefaultConnection")
        );

        return new WorthyCoinsDbContext(optionsBuilder.Options);
    }
}