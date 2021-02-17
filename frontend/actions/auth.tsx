import { API_BASE_URL } from '../config';
import axios from "axios";
import { headers } from "./global"

interface SignupState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUp = async (user: SignupState) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/signup`,
      method: "POST",
      headers,
      data: JSON.stringify(user),
    })
    return response.data
  } catch (err) {
    return err.response.data
  }
}

interface SigninState {
  email: string;
  password: string;
}

export const signIn = async (user: SigninState) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/signin`,
      method: "POST",
      headers,
      data: JSON.stringify(user),
    })
    return response.data
  } catch (err) {
    return err.response.data
  }
}

