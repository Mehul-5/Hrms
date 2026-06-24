using System;
using HRMS.Core.Postgres.Common;

namespace LeaveFeature.Domain
{
    public class LeaveBalance : BaseEntity
    {
        public Guid EmployeeId { get; set; }
        public string LeaveType { get; set; } = string.Empty; // e.g., "Annual", "Sick"
        public decimal TotalAllowed { get; set; }
        public decimal Used { get; set; } = 0m;
        public decimal Pending { get; set; } = 0m;
    }
}