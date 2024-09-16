'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';
import ArticleCard from './ArticleCard';
import ErrorPage from './Error';
import camelcaseKeys from 'camelcase-keys';
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

export default function ArticleList({ initialPage, limit }: { initialPage: number, limit: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    setPage(pageFromUrl);
  }, [searchParams]);

  const { data, error } = useSWR<{ articles: ArticleProps[] }>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?page=${page}&limit=${limit}`,
    fetcher
  );

  if (error) return <ErrorPage />;
  if (!data) return null; // Loadingは親コンポーネントのSuspenseで処理してるのでnullで返す

  const allArticles = camelcaseKeys(data.articles || []);
  const articles = allArticles.slice(0, limit);
  const totalItems = allArticles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
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
                <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <PaginationItem key={`page-${pageNumber}`}>
                <PaginationLink 
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={page === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {page < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}