import { API } from "../config";
import useSWR from "swr";

export const acceptTask = (task: any, token: any): any => {
  return fetch(`${API}/api/userTask`, {
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
