import useSWR from 'swr';
import { API_BASE_URL } from '../config';
import axios from "axios";
import { headers } from "./global"

export function getUser(url: string) {
  const { data, error, mutate } = useSWR(url, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });
  return { data, error, mutate };
}

interface StateUpdate {
  username: string;
  email: string;
  description: string;
  country: string;
  photo: string;
  progress?: number;
}

export const update = async (user: StateUpdate) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/user/update`,
      method: "PUT",
      headers,
      data: JSON.stringify(user),
    })
    return response.data
  } catch (err) {
    return err.response.data
  }

}

export function getUsers(url: string) {
  const { data, error, mutate } = useSWR(url, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });
  return { data, error, mutate };
}
