"use client";

import type { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useUserState } from "../hooks/useGlobalState";
import { useCallback, useEffect } from "react";
import { useNotificationState } from "../hooks/NotidicationStrate";

const SignOutPage: NextPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { showNotification } = useNotificationState();
    const [, setUser ] = useUserState();
    
    const signOut = useCallback(() => {
        localStorage.clear()
        setUser({
            id: 0,
            name: '',
            email: '',
            isSignedIn: false,
            isFetched: false
        });
        showNotification({
            message: 'サインアウトしました',
            variant: 'success',
            pathname: pathname,
        });
        router.push('/');
        
    }, [router, setUser, showNotification, pathname])
    useEffect(() => {
        signOut();
    }, [signOut]);
  return (
    <></>
  );
}

export default SignOutPage
