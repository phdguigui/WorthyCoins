using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorthyCoins.Infrastructure.Identity;

namespace WorthyCoins.Infrastructure.Configurations.Identity
{
    public class UserEfConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
        }
    }
}
