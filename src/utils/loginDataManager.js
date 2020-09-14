import { get, omit, pipe } from "lodash/fp";
import {
  LENS_TOKEN_KEY,
  LENS_TOKEN_EXPIRES,
  LENS_TOKEN_USER_DATA,
} from "../constants/login";

const setToken = (data, expiresAt) => {
  localStorage.setItem(LENS_TOKEN_KEY, get("jwtToken", data));
  if (expiresAt)
    localStorage.setItem(
      LENS_TOKEN_EXPIRES,
      String(expiresAt + new Date().getDate())
    );
};

const setUserData = (data) => {
  const dataPrepared = pipe(omit("jwtToken"), JSON.stringify)(data);
  localStorage.setItem(LENS_TOKEN_USER_DATA, dataPrepared);
};

export const setLoginData = (data, expiresAt) => {
  setToken(data, expiresAt);
  setUserData(data);
};

export const getToken = () => localStorage.getItem(LENS_TOKEN_KEY) || "";

export const getUserData = () =>
  JSON.parse(localStorage.getItem(LENS_TOKEN_USER_DATA) || "");

export const hasToken = () => {
  const tokenString = !!localStorage.getItem(LENS_TOKEN_KEY);
  const expiresAt = localStorage.getItem(LENS_TOKEN_EXPIRES);
  if (tokenString && !expiresAt) {
    return true;
  }

  return tokenString && new Date().getDate() <= expiresAt;
};

export const dropToken = () => {
  localStorage.removeItem(LENS_TOKEN_KEY);
  localStorage.removeItem(LENS_TOKEN_EXPIRES);
  localStorage.removeItem(LENS_TOKEN_USER_DATA);
  localStorage.clear();
};
