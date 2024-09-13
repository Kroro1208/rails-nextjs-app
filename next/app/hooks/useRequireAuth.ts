"use client"
import { usePathname, useRouter } from "next/navigation";
import { useUserState } from "./useGlobalState";
import { useEffect } from "react";
import { useNotificationState } from "./NotidicationStrate";

export function useRequireAuth() {
    const router = useRouter();
    const [ user ] = useUserState();
    const { showNotification } = useNotificationState();
    const pathname = usePathname();

    useEffect(() => {
        if (user.isFetched && !user.isSignedIn) {
            showNotification({
                message: '認証されていないユーザーです',
                variant: 'destructive',
                pathname: pathname
            });
            router.push('/');
        }
    }, [user, router, showNotification, pathname]);

    return user.isSignedIn;
}