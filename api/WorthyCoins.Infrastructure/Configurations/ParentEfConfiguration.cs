using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorthyCoins.Infrastructure.Identity;

namespace WorthyCoins.Infrastructure.Configurations
{
    public class ParentEfConfiguration : IEntityTypeConfiguration<Parent>
    {
        public void Configure(EntityTypeBuilder<Parent> builder)
        {
            builder.ToTable("Parent");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .HasOne<User>()
                .WithOne()
                .HasForeignKey<Parent>(x => x.UserId)
                .HasPrincipalKey<User>(x => x.Id);

            builder.HasMany(x => x.Children)
                .WithOne(x => x.Parent)
                .HasForeignKey(x => x.ParentId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
