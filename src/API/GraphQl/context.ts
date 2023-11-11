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
