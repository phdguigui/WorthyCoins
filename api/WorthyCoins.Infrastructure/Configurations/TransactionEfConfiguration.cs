using WorthyCoins.Domain.Entities;
using WorthyCoins.Domain.Enumerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WorthyCoins.Infrastructure.Configurations
{
    public class TransactionEfConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("Transaction");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.TransactionType)
                .IsRequired();

            builder.Property(x => x.Amount)
                .HasColumnType("numeric(10,2)")
                .IsRequired();

            builder.Property(x => x.TransactionDate)
                .IsRequired();

            builder.Property(x => x.Description)
                .HasMaxLength(500);

            builder.HasOne(t => t.Child)
                .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.ChildId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
