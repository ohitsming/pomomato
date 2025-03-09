import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { MONGODB_DB, MONGODB_NOTES } from '@/lib/constant';

export interface Note {
    _id?: {
        $oid: string;
    };
    user_id: string;
    content: string;
    created_at: string;
}

// Handle GET requests
export async function GET(request: Request) {
    try {
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

        const client = await clientPromise;
        const db = client.db(MONGODB_DB);
        const collection = db.collection<Note>(MONGODB_NOTES);

        // Fetch all notes from the collection
        const notes = await collection.find({ user_id: owner }).toArray();
        return NextResponse.json({ message: 'Notes fetched', data: notes });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
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
            user_id: owner,
            content,
            created_at,
        };

        // Insert the new note into the collection
        const client = await clientPromise;
        const db = client.db(MONGODB_DB);
        const collection = db.collection<Note>(MONGODB_NOTES);

        const result = await collection.insertOne(newNote);
        return NextResponse.json(
            {
                message: 'Note created',
                data: { id: result.insertedId },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}