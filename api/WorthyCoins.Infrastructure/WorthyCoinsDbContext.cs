using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class WorthyCoinsDbContext : DbContext
{
    public WorthyCoinsDbContext(DbContextOptions<WorthyCoinsDbContext> options)
        : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(WorthyCoinsDbContext).Assembly);
    }

    public DbSet<UserTask> UserTasks { get; set; }
    public DbSet<Child> Children { get; set; }
    public DbSet<Parent> Parents { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
}
