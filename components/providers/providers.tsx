"use client"; // Ensure this runs only on the client side

import { ReactNode } from "react";
import { AuthProvider } from "react-oidc-context";

const domain = process.env.NEXT_PUBLIC_DOMAIN_URI || "https://pomomato.com";
const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-west-1.amazonaws.com/us-west-1_uMxG15vXD",
    client_id: "1u3j6frgqicjk5pe6ujm8ibono",
    redirect_uri: domain + "/auth/callback",
    silent_redirect_uri: domain + "/auth/silent-renew",
    automaticSilentRenew: true,
    loadUserInfo: true,
    post_logout_redirect_uri: domain + "/auth/callback",
    response_type: "code",
    scope: "phone openid email",
    metadataUrl: 'https://cognito-idp.us-west-1.amazonaws.com/us-west-1_uMxG15vXD/.well-known/openid-configuration',
    extraQueryParams: {
        client_id: "1u3j6frgqicjk5pe6ujm8ibono" // Explicitly include client_id in all requests
    },
};


export default function Providers({ children }: { children: ReactNode }) {
    return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}