"use client"
import ErrorPage from "@/app/components/Error";
import Loading from "@/app/Loading";
import { Card, CardContent } from "@/components/ui/card";
import MarkDownText from "@/components/ui/MarkDownText";
import camelcaseKeys from "camelcase-keys";
import { FileTextIcon, RefreshCwIcon, UserIcon } from "lucide-react";
import type { NextPage } from "next";
import { useParams } from "next/navigation";
import useSWR from "swr";

type ArticleProps = {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string
    };
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ArticleDetails: NextPage = () => {
    const params = useParams();
    const id = params?.id;
    // idが存在しない場合や配列の場合（複数のパラメータがある場合）にエラーページを表示
    const url = id && !Array.isArray(id) ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}` : <ErrorPage />;

    const { data, error } = useSWR<ArticleProps>(url, fetcher);
    
    if(error) return <ErrorPage />
    if(!data) return <Loading />

    const article:ArticleProps = camelcaseKeys(data);
    return (
        <div className="bg-gray-100 pb-6 min-h-[calc(100vh-57px)]">
          <div className="lg:hidden flex items-center bg-white border-t border-gray-300 h-14 px-4 text-gray-600">
            <UserIcon className="w-5 h-5 mr-2" />
            <span className="mr-2">著者:</span>
            <span className="font-bold text-black">{article.user.name}</span>
          </div>
          <div className="container mx-auto px-4">
            <div className="pt-6 pb-3">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {article.title}
                </h2>
              </div>
              <p className="lg:hidden text-center text-gray-600 mt-5">
                {article.createdAt}に公開
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full">
                <Card className="shadow-none rounded-xl max-w-3xl mx-auto">
                  <CardContent className="p-6 sm:p-10">
                    <MarkDownText content={article.content} />
                  </CardContent>
                </Card>
              </div>
              <div className="hidden lg:block w-72">
                <Card className="shadow-none rounded-xl">
                  <CardContent className="p-0">
                    <ul className="text-gray-600 divide-y">
                      <li className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <UserIcon className="w-5 h-5 mr-2" />
                          <span>著者</span>
                        </div>
                        <span>{article.user.name}</span>
                      </li>
                      <li className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileTextIcon className="w-5 h-5 mr-2" />
                          <span>公開</span>
                        </div>
                        <span>{article.createdAt}</span>
                      </li>
                      <li className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <RefreshCwIcon className="w-5 h-5 mr-2" />
                          <span>本文更新</span>
                        </div>
                        <span>{article.updatedAt}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
}

export default ArticleDetails;
