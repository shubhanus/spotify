//@flow
const TOKEN_KEY = "authToken";

/**
 * get and returns token or null from localstorage
 * @returns {(string|null)} auth Barrier token
 */
export const getAuthToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
};

/**
 * stores token to localstorage
 * @param {string} token
 */
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
