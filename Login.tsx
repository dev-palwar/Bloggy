import { gql } from "@apollo/client";

const loginQuery = gql`
  query Login($input: login) {
    Auth_token: login(input: $input)
  }
`;

export const login = (email: string, password: string) => {
  const query = `
    query Login($input: login) {
      Auth_token: login(input: $input) 
    }
  `;

  const variables = {
    input: {
      email,
      password,
    },
  };

  fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("auth_token", data.data.Auth_token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  setTimeout(() => {
    console.log(localStorage.getItem("auth_token"));
  }, 500);
};
