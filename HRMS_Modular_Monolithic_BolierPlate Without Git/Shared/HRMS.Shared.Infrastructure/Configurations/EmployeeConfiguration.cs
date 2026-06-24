using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Domain.Entity;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Shared.Infrastructure.Configurations
{
    public class EmployeeConfiguration : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            // We extract the entity builder from the global model builder
            var builder = modelBuilder.Entity<Employee>();

            builder.ToTable("employees");

            builder.HasIndex(e => e.Email).IsUnique();
            builder.HasIndex(e => e.EmployeeCode).IsUnique();

            // Explicit Foreign Key Mapping for Direct Manager
            builder.HasOne(e => e.Manager)
                   .WithMany()
                   .HasForeignKey(e => e.ManagerId)
                   .OnDelete(DeleteBehavior.SetNull);

            // Explicit Foreign Key Mapping for Matrix/Reporting Manager
            builder.HasOne(e => e.ReportingManager)
                   .WithMany()
                   .HasForeignKey(e => e.ReportingManagerId)
                   .OnDelete(DeleteBehavior.SetNull);

            // ADR-001: PostgreSQL Check Constraints to prevent trivial self-assignment
            builder.ToTable(t => 
            {
                t.HasCheckConstraint("chk_no_self_manager", "\"ManagerId\" IS DISTINCT FROM \"Id\"");
                t.HasCheckConstraint("chk_no_self_reporting", "\"ReportingManagerId\" IS DISTINCT FROM \"Id\"");
                t.HasCheckConstraint("chk_distinct_managers", "\"ManagerId\" IS DISTINCT FROM \"ReportingManagerId\" OR \"ManagerId\" IS NULL");
            });
        }
    }
}