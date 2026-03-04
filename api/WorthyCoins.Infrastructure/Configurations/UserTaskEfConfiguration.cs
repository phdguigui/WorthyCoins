using WorthyCoins.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WorthyCoins.Infrastructure.Configurations
{
    public class UserTaskEfConfiguration : IEntityTypeConfiguration<UserTask>
    {
        public void Configure(EntityTypeBuilder<UserTask> builder)
        {
            builder.ToTable("UserTask");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(x => x.Description)
                .HasMaxLength(500);

            builder.Property(x => x.CreationDate)
                .IsRequired()
                .HasDefaultValueSql("now()");

            builder.Property(x => x.DueDate);

            builder.Property(x => x.IsCompleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.IsCanceled)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.RewardAmount)
                .IsRequired()
                .HasColumnType("numeric(10,2)");

            builder.HasOne(x => x.AssignedChild)
                .WithMany(x => x.Tasks)
                .HasForeignKey(x => x.AssignedChildId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
