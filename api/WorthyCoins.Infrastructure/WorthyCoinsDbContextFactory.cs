using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace WorthyCoins.Infrastructure;

public class WorthyCoinsDbContextFactory
    : IDesignTimeDbContextFactory<WorthyCoinsDbContext>
{
    public WorthyCoinsDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<WorthyCoinsDbContext>();

        optionsBuilder.UseNpgsql(
            "*****"
        );

        return new WorthyCoinsDbContext(optionsBuilder.Options);
    }
}