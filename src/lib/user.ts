export const setLoggedInUser = (token: string): boolean => {
  localStorage.setItem("auth_token", token);
  return true;
};

export const getLoggedInUser = (): LoggedInUser | undefined => {
  const token = localStorage.getItem("auth_token") as string;

  if (token != null) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedToken = JSON.parse(window.atob(base64));

    return decodedToken;
  }
};
