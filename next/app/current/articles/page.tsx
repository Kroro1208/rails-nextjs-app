"use client"
import ErrorPage from "@/app/components/Error";
import { useUserState } from "@/app/hooks/useGlobalState";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import Loading from "@/app/Loading";
import { fetcher } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import camelcaseKeys from "camelcase-keys";
import { ChevronRight, Edit } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

type ArticleProps = {
    id: number;
    title: string;
    status: string;
}

type ArticlesProps = ArticleProps[];

const CurrentUserArticles: NextPage = () => {
    useRequireAuth();
    const [ user ] = useUserState();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/articles`;
    const { data, error } = useSWR(user.isSignedIn ? url : null, fetcher);
    if(error) return <ErrorPage />
    if(!data) return <Loading />

    const articles: ArticlesProps = camelcaseKeys(data);

  return (
        <div className="min-h-screen bg-gray-50 pt-6 pb-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">記事の管理</h2>
                {articles.map((article: ArticleProps, i: number) => (
                    <Card key={i} className="mb-4">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{article.title}</h3>
                                <div className="flex items-center space-x-4">
                                    {article.status === '下書き' && (
                                        <span className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full">
                                            下書き
                                        </span>
                                    )}
                                    {article.status === '公開中' && (
                                        <span className="px-2 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-full">
                                            公開中
                                        </span>
                                    )}
                                    <TooltipProvider>
                                        <Link href={`/current/articles/edit/${article.id}`}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>編集する</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </Link>
                                    </TooltipProvider>
                                    <Link href={`/current/articles/${article.id}`}>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>表示を確認</p>
                                                    </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default CurrentUserArticles
