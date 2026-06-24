import { gql } from '@apollo/client';

export const SUBMIT_LEAVE_REQUEST = gql`
  mutation SubmitLeaveRequest($employeeId: UUID!, $leaveType: String!, $daysRequested: Decimal!) {
    submitLeaveRequest(
      employeeId: $employeeId,
      leaveType: $leaveType,
      daysRequested: $daysRequested
    )
  }
`;