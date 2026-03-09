using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WorthyCoins.Infrastructure.Configurations.Identity
{
    public class RoleClaimEfConfiguration : IEntityTypeConfiguration<IdentityRoleClaim<string>>
    {
        public void Configure(EntityTypeBuilder<IdentityRoleClaim<string>> builder)
        {
            builder.ToTable("RoleClaims");
        }
    }
}
