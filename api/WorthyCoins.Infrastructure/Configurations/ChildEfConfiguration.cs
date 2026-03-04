using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WorthyCoins.Infrastructure.Configurations
{
    public class ChildEfConfiguration : IEntityTypeConfiguration<Child>
    {
        public void Configure(EntityTypeBuilder<Child> builder)
        {
            builder.ToTable("Child");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(t => t.DateOfBirth)
               .IsRequired();

            builder.Property(t => t.TotalCoins)
                .IsRequired()
                .HasColumnType("numeric(10,2)")
                .HasDefaultValue(0);
        }
    }
}
