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
  query Blogs($userId: ID!) {
    profile: getProfile(userId: $userId) {
      blogs {
        id
        description
        title
        poster
        createdAt
        category
        Author {
          name
          id
          avatar
        }
      }
    }
  }
`;
