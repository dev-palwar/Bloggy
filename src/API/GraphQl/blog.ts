import { gql } from "@apollo/client";

export const AllBlogs = gql`
  query GetAllBlogs {
    blogs: getAllBlogs {
      title
      createdAt
      category
      author {
        id
        name
        createdAt
        avatar
      }
      description
      id
      poster
    }
  }
`;

export const getBlog = gql`
  query FindBlog($input: ID!) {
    Blog: findBlog(input: $input) {
      id
      title
      description
      poster
      createdAt
      category
      upvotes {
        id
      }
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const upvotingBlog = gql`
  mutation UpvoteOrDownvoteBlog($input: ID!) {
    upvoteOrDownvoteBlog(input: $input)
  }
`;

export const addBlog = gql`
  mutation CreateBlog($input: BlogInput!) {
    ID: createBlog(input: $input)
  }
`;
