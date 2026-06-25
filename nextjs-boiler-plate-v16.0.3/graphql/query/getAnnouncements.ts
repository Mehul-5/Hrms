import { gql } from '@apollo/client';

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcements {
      nodes {
        id
        title
        content
        author
        publishDate
      }
    }
  }
`;