// npm i --save-dev @types/cookie-cutter
import Cookies from "universal-cookie";
import { API } from "../config";

const cookies = new Cookies();

export const setCookie = (key: string, value: string) => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  cookies.set(key, value, {
    path: "/",
    expires: date,
    domain: "localhost",
  });
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie = (key: string) => {
  cookies.remove(key, { path: "/", domain: "localhost" });
};

export const authenticate = (data: any, next: any) => {
  setCookie("token", data.token);
  setCookie("user", data.user);

  next();
};

export const isAuth = () => {
  const cookieCheck = getCookie("token");
  if (cookieCheck) {
    return getCookie("user");
  }
};

// signout
export const signout = (next: any): any => {
  if (process.browser) {
    removeCookie("token");
    removeCookie("user");
    next();
  }

  return fetch(`${API}/api/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("signout sucess");
    })
    .catch((err) => console.log(err));
};
