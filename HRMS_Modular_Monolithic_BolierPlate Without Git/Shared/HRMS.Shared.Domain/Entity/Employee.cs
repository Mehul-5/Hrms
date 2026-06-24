using System;
using HRMS.Core.Postgres.Common;

namespace HRMS.Shared.Domain.Entity
{
    public class Employee : BaseEntity
    {
        public string EmployeeCode { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string SystemRole { get; set; } = "Employee";

        // ADR-001: Matrix Organization Hierarchy
        // Changed from Guid? to string? to match BaseEntity.Id
        public string? ManagerId { get; set; }
        public Employee? Manager { get; set; }

        public string? ReportingManagerId { get; set; }
        public Employee? ReportingManager { get; set; }
    }
}