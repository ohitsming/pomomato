"use client";

import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log(auth)
        if (!auth.isLoading && auth.isAuthenticated) {
            router.push("/");
        } 
        // not authenticated
        else if (!auth.isLoading && !auth.isAuthenticated) {
            localStorage.removeItem('id_token');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            router.push("/")
        }
    }, [auth, router]);

    return <div></div>;
}