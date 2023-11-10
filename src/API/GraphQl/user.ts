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

export const getProfile = gql`
  query GetProfile($userId: ID!) {
    profile: getProfile(userId: $userId) {
      id
      name
      bio
      nationality
      avatar
      blogs {
        id
        title
        poster
        createdAt
        description
        category
        Author {
          name
          id
          createdAt
          avatar
        }
      }
      following {
        id
        name
        avatar
      }
      followers {
        id
        name
        avatar
      }
    }
  }
`;
