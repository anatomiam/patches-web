import jwtDecode from "jwt-decode";

export const setAccessToken = token => {
  // TODO don't store the access token in localStorage
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000 && token ? false : true;
  } catch {
    return false;
  }
};
