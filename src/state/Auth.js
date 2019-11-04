export const setAccessToken = token => {
  // TODO don't store the access token in localStorage
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};
