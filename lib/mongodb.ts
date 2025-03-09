import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // Extend the global object to include your custom property
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}


if (!uri) {
    throw new Error('Missing MongoDB URI');
}

if (process.env.NODE_ENV === 'development') {
    // Use a global variable to preserve the connection in development
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, create a new connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;