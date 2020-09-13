const LENS_TOKEN_KEY = "lens/token";
const LENS_TOKEN_EXPIRES = "lens/expires";

/**
 * set the token with an expiration date
 *
 * @param {String} tokenString
 * @param {Long} expiresAt
 */
export const setToken = (tokenString, expiresAt) => {
  localStorage.setItem(LENS_TOKEN_KEY, tokenString);
  if (expiresAt)
    localStorage.setItem(
      LENS_TOKEN_EXPIRES,
      String(expiresAt + new Date().getDate())
    );
};

/**
 * get the token
 *
 * @return {String}
 */
export const getToken = () => {
  return localStorage.getItem(LENS_TOKEN_KEY) || "";
};

/**
 * check whether has the token or not
 *
 * @return {Boolean}
 */
export const hasToken = () => {
  const tokenString = !!localStorage.getItem(LENS_TOKEN_KEY);
  const expiresAt = localStorage.getItem(LENS_TOKEN_EXPIRES);
  if (tokenString && !expiresAt) {
    return true;
  }

  return tokenString && new Date().getDate() <= expiresAt;
};

/**
 * remove the token
 *
 * @return {}
 */
export const dropToken = () => {
  localStorage.removeItem(LENS_TOKEN_KEY);
  localStorage.removeItem(LENS_TOKEN_EXPIRES);
  localStorage.clear();
};
