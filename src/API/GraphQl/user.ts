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
  query GetProfile($input: ID!) {
    profile: getProfile(input: $input) {
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

export const followUnfollowQuery = gql`
  mutation FollowUnfollowUser($followUnfollowUserId: ID!) {
    follow: followUnfollowUser(id: $followUnfollowUserId)
  }
`;

export const signUpQuery = gql`
  mutation SignUp($input: signUp!) {
    signUp(input: $input)
  }
`;
