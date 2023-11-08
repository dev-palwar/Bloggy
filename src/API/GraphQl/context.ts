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
