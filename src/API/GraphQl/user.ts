import { gql } from "@apollo/client";

export const Login = gql`
  mutation Login($input: login!) {
    login: login(input: $input) {
      token
    }
  }
`;

export const getProfile = gql`
  query GetProfile($input: ID!) {
    Profile: getProfile(input: $input) {
      id
      name
      nationality
      createdAt
      bio
      avatar
      following {
        id
        name
        avatar
      }
      followers {
        name
        id
        avatar
      }
      blogs {
        title
        poster
        id
        description
        upvotes {
          id
        }
        createdAt
        author {
          name
          id
          avatar
        }
        category
      }
    }
  }
`;

export const followUnfollowQuery = gql`
  mutation FollowUnfollowUser($input: ID!) {
    follow: followUnfollowUser(input: $input)
  }
`;

export const signUpQuery = gql`
  mutation SignUp($input: signUp!) {
    signUp(input: $input)
  }
`;
