using System;

namespace HRMS.Core.Telemetry.Exceptions
{
    // ADR-003: Dedicated exception for business rule violations to prevent alert fatigue
    public class BusinessRuleException : Exception
    {
        public string ErrorCode { get; }

        public BusinessRuleException(string errorCode, string message) : base(message)
        {
            ErrorCode = errorCode;
        }
    }
}