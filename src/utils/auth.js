import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

const ExpiresInKey = "Admin-Expires-In";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, expires = 7 * 24 * 60) {
  Cookies.set(TokenKey, token, { expires: expires / 24 / 60 });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1;
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time);
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey);
}
