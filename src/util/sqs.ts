import { DeleteMessageCommand, ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import config from "../config/config";

const sqsClient = new SQSClient({
    region: config.AWS_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
});

export const receiveMessage = async () => {
    return await sqsClient.send(new ReceiveMessageCommand({
        QueueUrl: config.AWS_SQS_QUEUE_URL,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10
    }))
}

export const deleteMessage = async (receiveMessage: any) => {
    return await sqsClient.send(new DeleteMessageCommand({
        QueueUrl: config.AWS_SQS_QUEUE_URL,
        ReceiptHandle: receiveMessage.ReceiptHandle
    }))
}

export default sqsClient;
