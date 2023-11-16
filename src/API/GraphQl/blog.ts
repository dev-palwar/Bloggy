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
      poster
      description
      createdAt
      category
      author {
        id
        avatar
        name
        createdAt
      }
      upvotes {
        id
      }
      comments {
        id
        comment
        author {
          id
          avatar
          name
        }
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

export const deleteBlogQuery = gql`
  mutation DeleteBlog($input: ID!) {
    deleted: deleteBlog(input: $input)
  }
`;

export const addComment = gql`
  mutation AddCommentToBlog($input: AddComment!) {
    comment: addCommentToBlog(input: $input)
  }
`;

export const deleteCommentQuery = gql`
  mutation DeleteComment($input: ID!) {
    deleted: deleteComment(input: $input)
  }
`;
