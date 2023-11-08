import { jwtDecode } from "./jwt";

interface User {
  userId: string;
  name: string;
}

export const getLoggedInUser = (): User => {
  const token = localStorage.getItem("auth_token") as string;
  const { decodedToken } = jwtDecode(token);
  const user = {
    userId: decodedToken.userId,
    name: decodedToken.name,
  };
  return user;
};

export const setUser = (token: string) => {
  localStorage.setItem("auth_token", token);
  return true;
};
