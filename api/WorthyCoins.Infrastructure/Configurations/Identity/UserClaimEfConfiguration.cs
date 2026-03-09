using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WorthyCoins.Infrastructure.Configurations.Identity
{
    public class UserClaimEfConfiguration : IEntityTypeConfiguration<IdentityUserClaim<string>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserClaim<string>> builder)
        {
            builder.ToTable("UserClaims");
        }
    }
}
