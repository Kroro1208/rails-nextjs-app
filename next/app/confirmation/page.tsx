"use client"
import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useNotificationState } from "../hooks/NotidicationStrate";

const Confirmation: NextPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showNotification } = useNotificationState();

  useEffect(() => {
    const confirmationToken = searchParams.get('confirmation_token')
    console.log(confirmationToken);
    
    if (confirmationToken) {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/confirmations`
      axios({
        method: 'PATCH',
        url: url,
        data: { confirmation_token: confirmationToken }
      })
        .then(() => {
          showNotification({
            message: "認証に成功しました",
            variant: 'success',
            pathname: '/signin'
          })
          router.push('/signin')
        })
        .catch((error: AxiosError<{ message: string }>) => {
          console.log(error.message);
          showNotification({
            message: '認証に失敗しました',
            variant: 'destructive',
            pathname: '/'
          })
          router.push('/')
        })
    } else {
      showNotification({
        message: '不正なアクセスです',
        variant: 'destructive',
        pathname: '/'
      })
      router.push('/')
    }
  }, [router, showNotification, searchParams])

  return <></>
}

export default Confirmation