"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useUserState } from "../hooks/useGlobalState";
import { useEffect } from "react";

const SignOutPage: NextPage = () => {
    const router = useRouter();
    const [_, setUser ] = useUserState();
    
    useEffect(() => {
        localStorage.clear()
        setUser({
            id: 0,
            name: '',
            email: '',
            isSignedIn: false,
            isFetched: false
        });
        router.push('/');
    }, [router, setUser])
  return (
    <></>
  );
}

export default SignOutPage
