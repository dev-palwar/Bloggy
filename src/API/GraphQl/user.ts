import { gql } from "@apollo/client";

export const Login = gql`
  mutation Login($input: login!) {
    login(input: $input) {
      token
      user {
        name
        email
      }
    }
  }
`;

export const usersBlogs = gql`
  query GetUsersBlogs {
    blogs: getUsersBlogs {
      id
      title
      description
      category
      poster
      createdAt
      Author {
        name
        avatar
      }
    }
  }
`;
