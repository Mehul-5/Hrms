using System;
using System.Threading;
using System.Threading.Tasks;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Telemetry.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace LeaveFeature.Application.Handlers
{
    public record SubmitLeaveCommand(Guid EmployeeId, string LeaveType, decimal DaysRequested) : IRequest<bool>;

    public class SubmitLeaveCommandHandler : IRequestHandler<SubmitLeaveCommand, bool>
    {
        private readonly PostgresDbContext _dbContext;

        public SubmitLeaveCommandHandler(PostgresDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(SubmitLeaveCommand request, CancellationToken cancellationToken)
        {
            // ADR-002: Atomic conditional update relying on PostgreSQL row-level locking.
            // This prevents the scenario where two simultaneous requests result in a negative balance.
            var sql = @"
                UPDATE leave_balances 
                SET ""Pending"" = ""Pending"" + {0}
                WHERE ""EmployeeId"" = {1} 
                  AND ""LeaveType"" = {2} 
                  AND (""TotalAllowed"" - ""Used"" - ""Pending"") >= {0};";

            var rowsAffected = await _dbContext.Database.ExecuteSqlRawAsync(
                sql, 
                new object[] { request.DaysRequested, request.EmployeeId, request.LeaveType }, 
                cancellationToken);

            if (rowsAffected == 0)
            {
                // This exception will be caught by the global error filter (ADR-003)
                throw new BusinessRuleException("INSUFFICIENT_BALANCE", "Not enough leave balance available.");
            }

            return true;
        }
    }
}