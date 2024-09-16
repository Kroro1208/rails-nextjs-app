import { Suspense } from 'react';
import ArticleList from './components/ArticleList';
import Loading from './Loading';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams['page']) || 1;
  const limit = 9; // 1ページあたりの記事数

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <ArticleList initialPage={page} limit={limit} />
      </Suspense>
    </div>
  );
}