import { gql } from "@apollo/client";

export const AllBlogs = gql`
  query GetAllBlogs {
    blog: getAllBlogs {
      id
      title
      description
      poster
      category
      createdAt
      Author {
        id
        name
        avatar
      }
    }
  }
`;

export const getBlog = gql`
  mutation FindBlog($findBlogId: ID) {
    blog: findBlog(id: $findBlogId) {
      id
      title
      description
      createdAt
      Author {
        id
        avatar
        name
      }
      category
      tags
    }
  }
`;
