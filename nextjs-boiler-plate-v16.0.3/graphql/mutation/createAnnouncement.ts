import { gql } from '@apollo/client';

export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($title: String!, $content: String!, $author: String!) {
    createAnnouncement(title: $title, content: $content, author: $author) {
      id
      title
      publishDate
    }
  }
`;