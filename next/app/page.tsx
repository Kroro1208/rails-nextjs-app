"use client";

import useSWR from "swr";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ArticleCard from "./components/ArticleCard";
import Loading from "./Loading";
import camelcaseKeys from 'camelcase-keys'
import ErrorPage from "./components/Error";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = 9; // 1ページあたりの記事数

  const { data, error } = useSWR<{ articles: ArticleProps[], total: number }>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?page=${page}&limit=${limit}`,
    fetcher
  );

  if (error) return <ErrorPage />;
  if (!data) return <Loading />;

  const articles = camelcaseKeys(data.articles).slice(0, limit);
  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: ArticleProps) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
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
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/?page=${page - 1}`} />
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <PaginationItem key={`page-${pageNumber}`}>
                <PaginationLink href={`/?page=${pageNumber}`} isActive={page === pageNumber}>
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href={page < totalPages ? `/?page=${page + 1}` : undefined} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}