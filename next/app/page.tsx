"use client";

import Link from "next/link";
import useSWR from "swr";

import Loading from "./Loading";
import ArticleCard from "./components/ArticleCard";

type ArticleProps = {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at: string;
  fromToday?: string;
  user?: {
    name: string;
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR<{ articles: ArticleProps[] }>(
    "http://localhost:3000/api/v1/articles",
    fetcher,
  );

  if (error) return <div>エラーが発生しました: {error.message}</div>;
  if (!data) return <Loading />;

  const { articles } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((article: ArticleProps) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="no-underline"
          >
            <ArticleCard
              title={article.title}
              fromToday={article.fromToday || article.created_at}
              userName={article.user?.name || "名前なし"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
