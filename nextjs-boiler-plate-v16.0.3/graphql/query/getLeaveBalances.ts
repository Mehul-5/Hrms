import { gql } from '@apollo/client';

export const GET_LEAVE_BALANCES = gql`
  query GetLeaveBalances {
    leaveBalances {
      nodes {
        id
        leaveType
        totalAllowed
        used
        pending
      }
      totalCount
    }
  }
`;