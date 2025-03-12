import { NextResponse } from 'next/server';

// PayPal API credentials
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API_URL =
    process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'sandbox'
        ? 'https://api-m.sandbox.paypal.com'
        : 'https://api-m.paypal.com';

// Helper function to get PayPal access token
async function getPayPalAccessToken(): Promise<string> {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
}

export async function POST(request: Request) {
    try {
        const planId = "P-0NL145534Y155662WM7IL4OA";

        // Get PayPal access token
        const accessToken = await getPayPalAccessToken();

        // Create subscription request
        const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plan_id: planId,
                start_time: new Date().toISOString(),
                application_context: {
                    return_url: 'http://localhost:3000/success',
                    cancel_url: 'http://localhost:3000/cancel',
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create subscription');
        }

        // Return the approval URL
        const approvalUrl = data.links.find(
            (link: { rel: string }) => link.rel === 'approve'
        ).href;

        return NextResponse.json({ approvalUrl });
    } catch (error) {
        console.error('Error creating subscription:', error);
        return NextResponse.json(
            { error: 'Failed to create subscription' },
            { status: 500 }
        );
    }
}