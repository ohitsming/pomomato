import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Initialize the JWKS client
const client = jwksClient({
    jwksUri: 'https://cognito-idp.us-west-1.amazonaws.com/us-west-1_uMxG15vXD/.well-known/jwks.json', // Replace with your JWKS URL
});

// Function to get the public key
function getKey(header: any, callback: any) {
    client.getSigningKey(header.kid, (err: any, key: any) => {
        if (err) {
            callback(err, null);
            return;
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

// Verify the token
export function verifyToken(token: string): Promise<{ sub: string }> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as { sub: string });
            }
        });
    });
}