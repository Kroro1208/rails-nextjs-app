"use client"
import { NextPage } from 'next';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useUserState } from '@/app/hooks/useGlobalState';
import { fetcher } from '@/app/utils';
import ErrorPage from '@/app/components/Error';
import Loading from '@/app/Loading';
import camelcaseKeys from 'camelcase-keys';
import Link from 'next/link';
import { Settings, FileText, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MarkDownText from '@/components/ui/MarkDownText';

type CurrentArticleProps = {
    title: string;
    content: string;
    createdAt: string;
    status: string;
}

const CurrentUserArticleDetails: NextPage = () => {
    useRequireAuth();
    const [user] = useUserState();
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/articles`;
    const params = useParams();
    const articleId = params.id;

    console.log('Debug: ', { user, baseUrl, articleId });

    const { data, error } = useSWR(user.isSignedIn && articleId ? `${baseUrl}/${articleId}` : null, fetcher);

    if (error) return <ErrorPage />;
    if (!data) return <Loading />;
    const article: CurrentArticleProps = camelcaseKeys(data);

    return (
        <div className="min-h-screen bg-gray-100 pb-6">
            <div className="block lg:hidden bg-white border-t border-gray-300 h-14 text-gray-600">
                <div className="container mx-auto max-w-sm h-full flex justify-around items-center">
                    <div className="flex items-center gap-2">
                        <Settings size={16} />
                        <p className="text-sm sm:text-base">ステータス: {article.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <p className="text-sm sm:text-base">公開: {article.createdAt}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl">
                <div className="pt-6 pb-3">
                    <div className="flex items-center gap-2 mx-auto">
                        <div className="w-10 h-10">
                            <Link href="/current/articles">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon" className="bg-gray-200">
                                                <ChevronLeft className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>記事の管理に戻る</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Link>
                        </div>
                        <div className="text-center flex-1">
                            <h2 className="text-xl sm:text-2xl font-bold leading-10">
                                {article.title}
                            </h2>
                        </div>
                    </div>
                    <p className="block lg:hidden text-center text-gray-600 mt-5">
                        {article.createdAt}に公開
                    </p>
                </div>

                <div className="flex gap-6">
                    <div className="w-full">
                        <Card className="shadow-none rounded-xl max-w-3xl mx-auto">
                            <CardContent className="p-6 sm:p-10 mt-6 sm:mt-10">
                                <MarkDownText content={article.content} />
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="hidden lg:block w-72 min-w-[300px]">
                        <Card className="shadow-none rounded-xl">
                            <CardContent className="p-0">
                                <div className="text-gray-600">
                                    <div className="flex justify-between items-center p-4 border-b">
                                        <div className="flex items-center">
                                            <Settings className="mr-2" size={16} />
                                            <p>ステータス</p>
                                        </div>
                                        <p>{article.status}</p>
                                    </div>
                                    <div className="flex justify-between items-center p-4">
                                        <div className="flex items-center">
                                            <FileText className="mr-2" size={16} />
                                            <p>公開</p>
                                        </div>
                                        <p>{article.createdAt}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentUserArticleDetails;