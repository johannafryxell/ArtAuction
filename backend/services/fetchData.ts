import axios, { AxiosResponse } from "axios";

export async function fetchData<T>(url: string): Promise<T> {
  return axios.get<T>(url).then((response: AxiosResponse<T>) => {
    const data: T = response.data;
    return data;
  });
}