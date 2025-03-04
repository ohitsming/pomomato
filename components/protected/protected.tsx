import { useAuth } from "react-oidc-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: any) => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            auth.signinRedirect();
        }
    }, [auth, router]);

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (!auth.isAuthenticated) {
        return <div>User access denied.</div>;
    }

    return <>{children}</>;
};