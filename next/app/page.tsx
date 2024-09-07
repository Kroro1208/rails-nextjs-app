"use client";

import axios from "axios";
import useSWR from "swr";
import Loading from "./Loading";
import SimpleButton from "./components/SimpleButton";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
  const { data, error } = useSWR(
    "http://localhost:3000/api/v1/health_check",
    fetcher,
  );

  console.log(data);

  if (error) return <div>エラーが発生しました: {error.message}</div>;
  if (!data) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3 p-5">
      <h1>Health Check Result</h1>
      <p>{data.message}</p>
      <SimpleButton text={"ここをクリック"} />
    </div>
  );
}
