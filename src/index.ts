import type { S3Event } from "aws-lambda";
import { deleteMessage, receiveMessage } from "./util/sqs";
import  { TranscodeVideos } from "./util/ecs";

async function init() {
    while (true) {
        const { Messages } = await receiveMessage();
        if (!Messages) {
            console.log("No Message in Queue");
            continue;
        }

        try {
            for (const message of Messages) {
                const { MessageId, Body } = message;

                console.log(`Message Received`, { MessageId, Body });

                if (!Body) continue;

                // validate & parse the event
                const event = JSON.parse(Body) as S3Event;

                // ignore the test event
                if ("Service" in event && "Event" in event) {
                    if (event.Event === "s3:TestEvent") {
                        // delete message from queue
                        await deleteMessage(message);
                        console.log("Message deleted successfully")
                        continue;
                    }
                }

                // spin the docker container
                await TranscodeVideos(event);

                // delete message from queue
                await deleteMessage(message);
                console.log("Message deleted successfully")
            }
        } catch (error) {
            console.log(error);
        }
    }
}

init().catch(console.error);