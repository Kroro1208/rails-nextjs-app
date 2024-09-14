"use client";
import ErrorPage from "@/app/components/Error";
import { useNotificationState } from "@/app/hooks/NotidicationStrate";
import { useUserState } from "@/app/hooks/useGlobalState";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import Loading from "@/app/Loading";
import { fetcher } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MarkDownText from "@/components/ui/MarkDownText";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

type ArticleProps = {
    title: string;
    content: string;
    status: string;
}

type ArticleFormData = {
    title: string;
    content: string;
}

const EditArticlePage = () => {
    useRequireAuth();
    const [ user ] = useUserState();
    const params = useParams();
    const pathname = usePathname();
    const [ previewChecked, setPreviewChecked ] = useState(false);
    const [ statusChecked, setStatusChecked ] = useState(false);
    const [ isFetched, setIsFetched ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { showNotification } = useNotificationState();
    
    const handleChangePreviewChecked = () => {
        setPreviewChecked(!previewChecked);
    }
    
    const handleChangeStatusChecked = () => {
        setStatusChecked(!statusChecked);
    }
    
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/articles`
    const articleId = params.id; // ここで"edit/{id}"という形で取得できる
    const { data, error } = useSWR( user.isSignedIn && articleId ? `${url}/${articleId}` : null, fetcher );

    const article: ArticleProps = useMemo(() => {
        if(!data) {
            return {
                title: '',
                content: '',
                status: false
            }
        }
        return {
            title: data.title == null ? '' : data.title,
            content: data.content == null ? '' : data.content,
            status: data.status
        }
    }, [data]);

    const { handleSubmit, control, reset, watch } = useForm<ArticleFormData>({
        defaultValues: article
    });

    useEffect(() => {
        if(data) {
            reset(article);
            setStatusChecked(article.status === '公開中');
            setIsFetched(true);
        }
    }, [data, article, reset]);

    const onSubmit: SubmitHandler<ArticleFormData> = (data) => {
        if(data.title === '') {
            return (
                showNotification({
                    message: '記事の保存にはタイトルが必須です',
                    variant: 'destructive',
                    pathname: pathname
                })
            );
        }

        if(statusChecked && data.content === '') {
            return (
                showNotification({
                    message: '本文なしの記事は公開できません',
                    variant: 'destructive',
                    pathname: pathname
                })
            );
        }

        setIsLoading(true);

        const patchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/articles/${articleId}`;
        const headers = {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            'client': localStorage.getITem('client'),
            'uid': localStorage.getItem('uid')
        }

        const status = statusChecked ? 'published' : 'draft'
        const patchData ={ ...data, status: status };

        axios({
            method: 'PATCH',
            url: patchUrl,
            data: patchData,
            headers: headers
        }).then(() => {
            showNotification({
                message: '記事の保存に成功しました',
                variant: 'success',
                pathname: pathname
            });
        }).catch((error: AxiosError<{error: string}>) => {
            console.log(error.message);
            showNotification({
                message: '記事の保存に失敗しました',
                variant: 'destructive',
                pathname: pathname
            })
        })

        setIsLoading(false);
    }

    if(error) return <ErrorPage />
    if(!data || isFetched) return <Loading />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 bg-gray-100 z-10">
        <div className="flex justify-between items-center p-4">
          <div className="w-12">
            <Link href="/current/articles">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-center">
              <Switch
                checked={previewChecked}
                onCheckedChange={handleChangePreviewChecked}
              />
              <p className="text-xs sm:text-sm">プレビュー表示</p>
            </div>
            <div className="text-center">
              <Switch
                checked={statusChecked}
                onCheckedChange={handleChangeStatusChecked}
              />
              <p className="text-xs sm:text-sm">下書き／公開</p>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "更新中..." : "更新する"}
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-20 pb-8 flex justify-center">
        {!previewChecked ? (
          <div className="w-full max-w-3xl">
            <div className="mb-4">
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Write in Title"
                    className="bg-white"
                  />
                )}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{ error.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="content"
                control={control}
                render={({ field, fieldState: { error  } }) => (
                  <Textarea
                    {...field}
                    placeholder="Write in Markdown Text"
                    rows={25}
                    className="bg-white"
                  />
                )}
              />
              { error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center py-4 sm:py-6">
              {watch('title')}
            </h2>
            <Card className="shadow-none rounded-xl">
              <div className="p-6 sm:p-10">
                <MarkDownText content={watch('content')} />
              </div>
            </Card>
          </div>
        )}
      </div>
    </form>
  )
}

export default EditArticlePage
