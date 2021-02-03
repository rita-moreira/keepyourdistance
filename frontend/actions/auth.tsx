import { API } from "../config";

interface SignupState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// signup
export const signup = (user: SignupState): any => {
  return fetch(`${API}/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

interface SigninState {
  email: string;
  password: string;
}

export const signin = (user: SigninState): any => {
  return fetch(`${API}/api/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
