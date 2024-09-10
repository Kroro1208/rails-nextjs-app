"use client";

import useSWR from "swr";
import Link from "next/link";
import ArticleCard from "./components/ArticleCard";
import Loading from "./Loading";
import camelcaseKeys from 'camelcase-keys'
import ErrorPage from "./components/Error";

type ArticleProps = {
  id: number;
  title: string;
  createdAt: string;
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

  if (error) return <ErrorPage />;
  if (!data) return <Loading />;

  const articles = camelcaseKeys(data.articles);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: ArticleProps) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="no-underline transition-transform duration-300 hover:scale-105"
          >
            <ArticleCard
              title={article.title}
              fromToday={article.fromToday || article.createdAt}
              userName={article.user?.name || "名前なし"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}