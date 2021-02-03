import useSWR from "swr";
import { API } from "../config";

export const createTask = (task: any, token: any): any => {
  return fetch(`${API}/api/task`, {
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
  const { data, error } = useSWR<Data, Error>(url, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });
  return { data, error };
}
