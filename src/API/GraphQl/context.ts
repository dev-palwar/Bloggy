import { gql } from "@apollo/client";

// This is just to test the application
export const hello = gql`
  query Query {
    hello
  }
`;

// This is the middleware
export const context = () => {
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("auth_token")
      : null;

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
