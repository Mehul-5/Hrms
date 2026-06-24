CREATE TABLE IF NOT EXISTS leave_balances (
    "Id" character varying(128) PRIMARY KEY,
    "EmployeeId" uuid NOT NULL,
    "LeaveType" character varying(100) NOT NULL,
    "TotalAllowed" numeric NOT NULL,
    "Used" numeric NOT NULL,
    "Pending" numeric NOT NULL
);

INSERT INTO leave_balances ("Id", "EmployeeId", "LeaveType", "TotalAllowed", "Used", "Pending") 
VALUES ('test-id-1234', '00000000-0000-0000-0000-000000000000', 'Annual', 20, 0, 0);