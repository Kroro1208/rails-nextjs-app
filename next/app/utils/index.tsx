import axios, { type AxiosError, type AxiosResponse } from "axios";

export const fetcher = (url: string) => {
  return axios
    .get(url, {
      // 認証情報がある場合のみヘッダーに含める
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid')
      }
    })
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError) => {
      console.log(error.message);
      throw error;
    });
};
