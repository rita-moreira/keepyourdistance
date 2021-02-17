import axios from "axios";
import useSWR from "swr";

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async (url) => {
    const response = await axios(url);
    const data = await response.data;
    return data;
  });
  return { data, error, mutate };
}

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
