export const getUser = () => {
  const token = localStorage.getItem("auth_token");
  return token;
};

export const setUser = (token: string) => {
  localStorage.setItem("auth_token", token);
  return true;
};
