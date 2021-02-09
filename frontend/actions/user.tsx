import { API } from "../config";
import useSWR from "swr";

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
}

export const update = (user: StateUpdate): any => {
  return fetch(`${API}/api/user/update`, {
    method: "PUT",
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

export function getUsers(url: string) {
  const { data, error, mutate } = useSWR(url, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });
  return { data, error, mutate };
}
