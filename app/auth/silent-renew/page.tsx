"use client";

import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function SilentRenewPage() {
    const auth = useAuth();

    useEffect(() => {
        // This page is loaded in an iframe to handle silent token renewal
        // No need to add any specific code here
    }, []);

    return <div>Renewing session...</div>;
}
