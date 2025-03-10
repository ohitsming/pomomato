import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


const awsRegion = process.env.AWS_REGION || "";
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";

var docClient = null;
if(awsRegion && awsAccessKeyId && awsSecretAccessKey) {
    
    const client = new DynamoDBClient({
        region: awsRegion,
        credentials: {
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey,
        },
    });
    docClient = DynamoDBDocumentClient.from(client);

}

export { docClient };