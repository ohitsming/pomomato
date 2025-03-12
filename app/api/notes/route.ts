import { NextResponse } from 'next/server';
import { DynamoDBClient, PutItemCommand, ExecuteStatementCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { verifyToken } from '@/lib/auth';
import { v4 as uuidv4 } from "uuid";

// Initialize DynamoDB Client
const client = new DynamoDBClient({
    region: process.env.NEXT_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY!,
    },
});

// Define the DynamoDB table name
const DYNAMODB_TABLE_NAME = "pomomato.notes";

export interface Note {
    note_id: string; // Partition key
    user_id: string; // Sort key
    content: string;
    created_at: string;
}

// Handle GET requests
export async function GET(request: Request) {
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

        // Unmarshall DynamoDB items into Note objects
        const notes = result.Items?.map((item) => unmarshall(item)) as Note[];

        return NextResponse.json({ message: 'Notes fetched', data: notes });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

// Handle POST requests
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

        // Parse the request body
        const body = await request.json();
        const { content } = body;
        const created_at = new Date(Date.now()).toISOString().split('.')[0] + 'Z';

        if (!content || !created_at) {
            return NextResponse.json(
                { message: 'content and created_at are required' },
                { status: 400 }
            );
        }

        // Create a new note document
        const newNote: Note = {
            note_id: uuidv4(), // Generate a unique ID
            user_id: owner,
            content,
            created_at,
        };

        // Insert the new note into DynamoDB
        const params = {
            TableName: DYNAMODB_TABLE_NAME,
            Item: marshall(newNote),
        };

        const command = new PutItemCommand(params);
        await client.send(command);

        return NextResponse.json(
            {
                message: 'Note created',
                data: { id: newNote.note_id },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { note_id: string } } ) {
    
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

        const body = await request.json();
        const { note_id } = body;

        if(!note_id) {
            return NextResponse.json({ message: 'note_id is required' }, { status: 500 });
        }

        const query = `DELETE FROM "${DYNAMODB_TABLE_NAME}" WHERE note_id = '${note_id}' AND user_id = '${owner}'`;

        const command = new ExecuteStatementCommand({
            Statement: query,
        });
        await client.send(command);
        return NextResponse.json({ message: "Item deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting item:", error);
        return NextResponse.json(
            { message: "Failed to delete item", error: error?.message },
            { status: 500 }
        );
    }
}