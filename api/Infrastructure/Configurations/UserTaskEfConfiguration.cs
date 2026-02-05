using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class UserTaskEfConfiguration : IEntityTypeConfiguration<UserTask>
    {
        public void Configure(EntityTypeBuilder<UserTask> builder)
        {
            builder.ToTable("UserTask");

            // Primary Key
            builder.HasKey(t => t.Id);

            // Properties
            builder.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(t => t.Description)
                .HasMaxLength(500);

            builder.Property(t => t.CreationDate)
                .IsRequired()
                .HasDefaultValueSql("now()");

            builder.Property(t => t.DueDate);

            builder.Property(t => t.IsCompleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(t => t.IsCanceled)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(t => t.RewardAmout)
                .IsRequired()
                .HasColumnType("numeric(10,2)");

            // Relationships
            builder.HasOne(t => t.AssignedChild)
                .WithMany(c => c.Tasks)
                .HasForeignKey(t => t.AssignedChildId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
