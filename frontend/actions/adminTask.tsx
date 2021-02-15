import { API } from "../config";
import useSWR from "swr";

export const completeTask = (task: any, token: any): any => {
  return fetch(`${API}/api/adminTask`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });
  return { data, error, mutate };
}

// add comment

export const addComment = (comment: any, token: any): any => {
  return fetch(`${API}/api/comments`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
