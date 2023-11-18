import { gql } from "@apollo/client";

// This is just to test the application
export const hello = gql`
  query Query {
    hello
  }
`;

export const context = () => {
  const token = localStorage.getItem("auth_token");
  return {
    context: {
      headers: {
        Authorization: token,
      },
    },
  };
};

export const variables = (id: string) => {
  return {
    variables: {
      input: id,
    },
  };
};
