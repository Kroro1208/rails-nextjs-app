"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotificationState } from "../hooks/NotidicationStrate";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type SignUpFormData = {
  email: string;
  password: string;
  name: string;
};

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotificationState();

  const { handleSubmit, control } = useForm<SignUpFormData>({
    defaultValues: { email: "", password: "", name: "" },
  });

  const validationRules = {
    email: {
      required: "メールアドレスは必須です",
      pattern: {
        value: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: "正しいメールアドレスの形式で入力してください",
      },
    },
    password: {
      required: "パスワードは必須です",
    },
    name: {
      required: "ユーザー名は必須です",
    },
  };

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const SignUp = async (data: SignUpFormData) => {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`;
      const headers = { "Content-Type": "application/json" };
      const confirmSuccessUrl = `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/signin`;

      try {
        const res: AxiosResponse = await axios({
          method: "POST",
          url: url,
          data: { ...data, confirm_success_url: confirmSuccessUrl },
          headers: headers,
        });

        localStorage.setItem("access-token", res.headers["access-token"] || "");
        localStorage.setItem("clinet", res.headers["client"] || "");
        localStorage.setItem("uid", res.headers["uid"] || "");

        showNotification({
          message: "サインアップに成功しました。認証メールをご確認ください",
          variant: "success",
          pathname: "/",
        });

        router.push("/");
      } catch (error) {
        console.log((error as AxiosError).message);
        showNotification({
          message: "不正なユーザーです",
          variant: "destructive",
          pathname: "/signup",
        });
      } finally {
        setIsLoading(false);
      }
    };
    SignUp(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-12 justify-start px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Controller
                name="email"
                control={control}
                rules={validationRules.email}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="example@example.com"
                      className={fieldState.invalid ? "border-red-500" : ""}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Controller
                name="password"
                control={control}
                rules={validationRules.password}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      className={fieldState.invalid ? "border-red-500" : ""}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">ユーザー名</Label>
              <Controller
                name="name"
                control={control}
                rules={validationRules.name}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      type="text"
                      id="name"
                      className={fieldState.invalid ? "border-red-500" : ""}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "送信中..." : "送信する"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;