export const jwtDecode = (token: string) => {
  const jwt = token;

  const base64Url = jwt.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decodedToken = JSON.parse(window.atob(base64));
  return { decodedToken };
};
