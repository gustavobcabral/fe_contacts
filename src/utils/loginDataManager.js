import { get, omit, pipe } from "lodash/fp";
import {
  LENS_TOKEN_KEY,
  LENS_TOKEN_EXPIRES,
  LENS_TOKEN_USER_DATA,
} from "../constants/login";
import { LENS_SETTINGS } from "../constants/settings";

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

export const setUserSettings = (data) => {
  const newData = {
    ...getUserSettings(),
    ...data,
  };
  localStorage.setItem(LENS_SETTINGS, JSON.stringify(newData));
};

export const getUserSettings = () =>
  localStorage.getItem(LENS_SETTINGS)
    ? JSON.parse(localStorage.getItem(LENS_SETTINGS))
    : "";

export const setLoginData = (data, expiresAt) => {
  setToken(data, expiresAt);
  setUserData(data);
};

export const getToken = () => localStorage.getItem(LENS_TOKEN_KEY) || "";

export const getUserData = () =>
  localStorage.getItem(LENS_TOKEN_USER_DATA)
    ? JSON.parse(localStorage.getItem(LENS_TOKEN_USER_DATA))
    : "";

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
