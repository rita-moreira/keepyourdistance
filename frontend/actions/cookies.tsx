// npm i --save-dev @types/cookie-cutter
import Cookies from 'universal-cookie';
import { API_BASE_URL } from '../config';
import axios from "axios";

const cookies = new Cookies();

export const setCookie = (key: string, value: string) => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  cookies.set(key, value, {
    path: '/',
    expires: date,
    domain: 'localhost',
  });
};

export const getCookie = (key: string) => cookies.get(key);

export const removeCookie = (key: string) => {
  cookies.remove(key, { path: '/', domain: 'localhost' });
};



interface DataState {
  token: string;
  user: { username: string, _id: string, email: string };
}

export const authenticate = (data: DataState, next: () => void) => {
  setCookie('token', data.token);
  setCookie('user', data.user);
  next();
};

export const isAuth = () => {
  const cookieCheck = getCookie('token');
  if (cookieCheck) {
    return getCookie('user');
  }
  return false;
};

export const signout = async (next: () => void): Promise<void> => {
  if (process.browser) {
    removeCookie('token');
    removeCookie('user');
    next();
  }
  try {
    await axios.get(`${API_BASE_URL}/api/signout`, {});
    console.log('signout sucess');
  } catch (err) {
    return console.log(err);
  }
};
