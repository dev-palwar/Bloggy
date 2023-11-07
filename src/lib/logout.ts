export const logout = () => {
  localStorage.removeItem("auth_token");
  window.location.reload();
};
