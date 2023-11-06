import { gql } from "@apollo/client";

export const AllBlogs = gql`
  query GetAllBlogs {
    blog: getAllBlogs {
      title
      description
      poster
    }
  }
`;
