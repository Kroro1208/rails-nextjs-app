import axios, { type AxiosError, type AxiosResponse } from "axios";

export const fetcher = (url: string) => {
  return axios
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError) => {
      console.log(error.message);
      throw error;
    });
};
