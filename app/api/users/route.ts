import { NextResponse } from 'next/server';
import { DynamoDBClient, PutItemCommand, ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
import { verifyToken } from '@/lib/auth';

// Initialize DynamoDB Client
const client = new DynamoDBClient({
    region: process.env.NEXT_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY!,
    },
});

// Define the DynamoDB table name
const DYNAMODB_TABLE_NAME = "pomomato.user";

export interface User {
    user_id: string; 
    subscription_status?: string;
    subscription_end_date?: number;
    auto_renew?: boolean;
}

export async function POST(request: Request) {
    try {
        // Verify the access token
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const decoded = await verifyToken(token).catch((err) => {
            console.error('Token verification failed:', err);
            return null;
        });

        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const owner = decoded.sub; // Unique identifier of the authenticated user

        // PARTIQL
        const query = `SELECT * FROM "${DYNAMODB_TABLE_NAME}" WHERE user_id = '${owner}'`;
        const command = new ExecuteStatementCommand({
            Statement: query,
        });
        const result = await client.send(command);

        let user: User;
        // Check if the user exists
        if (!result.Items || result.Items.length === 0) {
            
            // User doesn't exist, create a new "free" user
            const insertQuery = `
                INSERT INTO "${DYNAMODB_TABLE_NAME}" VALUE {
                    'user_id': '${owner}',
                    'subscription_status': 'free',
                    'auto_renew': false,
                    'subscription_end_date': 0
                }
            `;
            const insertCommand = new ExecuteStatementCommand({ Statement: insertQuery });
            await client.send(insertCommand);

            user = {
                user_id: owner,
                subscription_status: "free",
                auto_renew: false,
                subscription_end_date: 0
            };
            
        } else {

            // Return the subscription status
            const item = result.Items[0];
            const subscriptionStatus = item?.subscription_status?.S; // "free" or "premium"
            const subscriptionExpiry = Number(item?.subscription_end_date?.N || 0); // Unix timestamp
            const auto_renew = item?.auto_renew?.BOOL || false;

            user = {
                user_id: owner,
                subscription_status: subscriptionStatus,
                subscription_end_date: subscriptionExpiry,
                auto_renew: auto_renew
            };
        }

        return NextResponse.json({ user });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}