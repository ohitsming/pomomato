"use client";

import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        const runAuthCheck = async() => {
            if (!auth.isLoading && auth.isAuthenticated) {
                
                router.push("/");
            } 
            // not authenticated
            else if (!auth.isLoading && !auth.isAuthenticated) {
                localStorage.removeItem('id_token');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                sessionStorage.removeItem('id_token');
                sessionStorage.removeItem('subscription');
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('refresh_token');
                router.push("/")
            }
        }
        
        runAuthCheck();
    }, [auth, router]);

    return <div></div>;
}