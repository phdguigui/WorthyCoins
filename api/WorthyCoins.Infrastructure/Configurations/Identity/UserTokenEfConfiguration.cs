using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WorthyCoins.Infrastructure.Configurations.Identity
{
    public class UserTokenEfConfiguration : IEntityTypeConfiguration<IdentityUserToken<string>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserToken<string>> builder)
        {
            builder.ToTable("UserTokens");
        }
    }
}
