import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import config from "../config/config";
import { S3Event } from "aws-lambda";

const ecsClient = new ECSClient({
    region: config.AWS_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
});

export const TranscodeVideos = async (event: S3Event) => {
    console.log("transcoding started");
    for (const record of event.Records) {
        const { s3 } = record;
        const {
            bucket,
            object: { key },
        } = s3;
        const runTaskCommand = new RunTaskCommand({
            taskDefinition: config.AWS_ECS_TASK_ARN,
            cluster: config.AWS_ECS_CLUSTER_ARN,
            launchType: "FARGATE",
            networkConfiguration: {
                awsvpcConfiguration: {
                    subnets: [
                        "subnet-0b0d47f1440297a70",
                        "subnet-08444a4b6d72ad7dd",
                        "subnet-0fc3a18ddf9626a45",
                    ],
                    securityGroups: ["sg-066f78a6813e1c447"],
                    assignPublicIp: "ENABLED",
                },
            },
            overrides: {
                containerOverrides: [
                    {
                        name: config.AWS_ECS_CONTAINER_NAME,
                        environment: [
                            {
                                name: "AWS_REGION",
                                value: config.AWS_REGION,
                            },
                            {
                                name: "BUCKET_NAME",
                                value: bucket.name,
                            },
                            {
                                name: "KEY",
                                value: key,
                            },
                            {
                                name: "AWS_ACCESS_KEY_ID",
                                value: config.AWS_ACCESS_KEY_ID
                            },
                            {
                                name: "AWS_SECRET_ACCESS_KEY",
                                value: config.AWS_SECRET_ACCESS_KEY
                            },
                            {
                                name: "VIDEO_STATUS_API",
                                value: config.VIDEO_STATUS_API
                            }
                        ],
                    },
                ],
            },
        });


        const res = await ecsClient.send(runTaskCommand);
        console.log(res);
        console.log("transcoding completed");
        return;
    };
};


export default ecsClient;
