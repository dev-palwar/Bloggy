import { gql } from '@apollo/client';

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
