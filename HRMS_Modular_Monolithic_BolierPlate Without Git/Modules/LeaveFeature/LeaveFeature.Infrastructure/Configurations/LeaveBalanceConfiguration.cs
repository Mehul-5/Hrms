using HRMS.Core.Postgres.Interfaces;
using LeaveFeature.Domain;
using Microsoft.EntityFrameworkCore;

namespace LeaveFeature.Infrastructure.Configurations
{
    public class LeaveBalanceConfiguration : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            var builder = modelBuilder.Entity<LeaveBalance>();
            builder.ToTable("leave_balances");

            // Composite unique key to prevent duplicate balance records
            builder.HasIndex(lb => new { lb.EmployeeId, lb.LeaveType }).IsUnique();
        }
    }
}